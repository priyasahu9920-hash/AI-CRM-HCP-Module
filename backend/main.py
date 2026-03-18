from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy DB (temporary)
interactions = []

class Interaction(BaseModel):
    doctor_name: str
    notes: str

# 🔹 TOOL 1: Log Interaction
@app.post("/log-interaction")
def log_interaction(data: Interaction):
    summary = f"Summary: {data.notes[:50]}"
    sentiment = "Positive" if "good" in data.notes else "Neutral"

    record = {
        "doctor_name": data.doctor_name,
        "summary": summary,
        "sentiment": sentiment
    }

    interactions.append(record)
    return {"message": "Logged", "data": record}


# 🔹 TOOL 2: Edit Interaction
@app.put("/edit-interaction/{index}")
def edit_interaction(index: int, data: Interaction):
    if index < len(interactions):
        interactions[index]["doctor_name"] = data.doctor_name
        interactions[index]["summary"] = data.notes
        return {"message": "Updated"}
    return {"error": "Not found"}


# 🔹 TOOL 3: Get All
@app.get("/get-interactions")
def get_all():
    return interactions


# 🔹 TOOL 4: AI Suggestion
@app.get("/suggest-followup")
def suggest():
    return {"suggestion": "Follow up after 2 days"}


# 🔹 TOOL 5: Sentiment Check
@app.post("/sentiment")
def sentiment(data: Interaction):
    sentiment = "Positive" if "good" in data.notes else "Negative"
    return {"sentiment": sentiment}
    @app.get("/")
def home():
    return {"message": "Backend running successfully"}
