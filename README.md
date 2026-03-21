# AI CRM System - HCP Module

## Overview
This is a comprehensive full-stack AI CRM system customized for medical sales representatives to log interactions with Healthcare Professionals (HCPs). It seamlessly blends a highly aesthetic manual entry dashboard with an advanced AI-powered Chat Assistant capable of extracting information from natural language.

## Architecture
- **Frontend**: React.js with Redux Toolkit for state management, powered by modern CSS featuring glassmorphism design.
- **Backend**: Python FastAPI providing high-performance RESTful APIs.
- **AI Agent**: Built with LangGraph & LangChain, using Groq's ultra-fast `gemma2-9b-it` LLM.
- **Database**: Built-in SQLite via SQLAlchemy ORM (can be effortlessly swapped to PostgreSQL).

## Agent Tools Implemented
The LangGraph agent is configured with 5 specific capabilities:
1. `log_interaction_tool`: Parses natural language inputs, extracts entities (Doctor Name, Type, Sentiment, Notes), and directly saves to the database.
2. `edit_interaction_tool`: Modifies existing inputs and previously logged values.
3. `get_hcp_details_tool`: Searches and auto-fills specific doctor specialities and contact info.
4. `suggest_followup_tool`: AI suggests logical context-aware follow-up next steps (e.g. tracking a product interest after a 1-week delay).
5. `summarize_interaction_tool`: Takes verbose chat interactions and logs short professional summaries.

## Setup Instructions

### Environment Setup
You will need a Groq API Key to power the natural language capabilities of the agent (`gemma2-9b-it`).  

### 1. Start the Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Set your API Key and start the FastAPI server
set GROQ_API_KEY=your_api_key_here
uvicorn main:app --reload --port 8000
```
*(The API will be running at `http://localhost:8000`)*

### 2. Start the Frontend
```bash
cd frontend
# Install React dependencies
npm install

# Start the React Development Server
npm start
```
*(The UI will be accessible at `http://localhost:3000`)*

## Demo
Please refer to the `demo_video.webp` file included in this directory to view a complete flow recording of the active User Interface.
