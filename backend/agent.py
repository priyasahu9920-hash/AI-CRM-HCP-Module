import os
from langchain_groq import ChatGroq
from langchain_core.tools import tool
from langgraph.prebuilt import create_react_agent

import crud
import schemas
from database import SessionLocal

# Setup Groq LLM
groq_api_key = os.getenv("GROQ_API_KEY", "no-key")
llm = ChatGroq(model="gemma2-9b-it", api_key=groq_api_key)

# Define Tools
@tool
def log_interaction_tool(hcp_name: str, date: str, interaction_type: str, notes: str, sentiment: str):
    """Logs a new interaction with a Healthcare Professional. Extracts data and saves to DB."""
    db = SessionLocal()
    try:
        interaction_data = schemas.InteractionCreate(
            hcp_name=hcp_name,
            date=date,
            interaction_type=interaction_type,
            notes=notes,
            sentiment=sentiment,
            follow_up="Pending",
            summary="Pending"
        )
        return crud.create_interaction(db, interaction_data)
    finally:
        db.close()

@tool
def edit_interaction_tool(interaction_id: int, field_to_update: str, new_value: str):
    """Modifies an existing interaction. field_to_update can be 'sentiment', 'notes', etc."""
    db = SessionLocal()
    try:
        update_data = {field_to_update: new_value}
        interaction_update = schemas.InteractionUpdate(**update_data)
        updated = crud.update_interaction(db, interaction_id, interaction_update)
        if updated:
            return f"Interaction {interaction_id} updated successfully."
        return "Interaction not found."
    except Exception as e:
        return f"Error updating: {str(e)}"
    finally:
        db.close()

@tool
def get_hcp_details_tool(name: str):
    """Fetches doctor/HCP details by name to autofill information."""
    db = SessionLocal()
    try:
        hcp = crud.get_hcp_by_name(db, name)
        if hcp:
            return f"HCP Found: {hcp.name}, Specialty: {hcp.specialty}, Contact: {hcp.contact}"
        return f"No HCP found with name '{name}'"
    finally:
        db.close()

@tool
def suggest_followup_tool(notes: str):
    """AI suggests a follow-up action based on the meeting notes."""
    prompt = f"Based on these meeting notes, suggest a brief professional follow-up next step for the doctor: {notes}"
    # Invoke the llm for suggestion
    response = llm.invoke(prompt)
    return response.content

@tool
def summarize_interaction_tool(notes: str):
    """Converts long conversational notes into a short professional summary."""
    prompt = f"Summarize the following meeting notes concisely in a few sentences: {notes}"
    response = llm.invoke(prompt)
    return response.content

# Configure Agent
tools = [
    log_interaction_tool,
    edit_interaction_tool,
    get_hcp_details_tool,
    suggest_followup_tool,
    summarize_interaction_tool
]

system_prompt = '''You are a smart AI CRM assistant for medical sales reps.
Your job is to understand user chats and use the available tools to log interactions, get HCP details, suggest follow-ups, and summarize notes.
If the user reports an interacted meeting, you MUST pull the doctor's name, the date (if any, use today otherwise), the meeting type (call/meeting), the exact notes, and infer sentiment (Positive/Neutral/Negative). YOU MUST log it using the `log_interaction_tool`.
If the user wants to update an interaction, use `edit_interaction_tool`.
If the user asks for a doctor's info, use `get_hcp_details_tool`.'''

agent = create_react_agent(llm, tools, prompt=system_prompt)

def run_agent(user_input: str):
    response = agent.invoke({"messages": [("user", user_input)]})
    return response["messages"][-1].content
