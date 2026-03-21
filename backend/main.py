from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
import crud
from database import SessionLocal, engine, get_db
from pydantic import BaseModel
from agent import run_agent

# Create DB tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI CRM HCP Module API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "AI CRM HCP Module Backend is running"}

@app.post("/log-interaction", response_model=schemas.Interaction)
def log_interaction(interaction: schemas.InteractionCreate, db: Session = Depends(get_db)):
    return crud.create_interaction(db=db, interaction=interaction)

@app.get("/interactions", response_model=List[schemas.Interaction])
def read_interactions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_interactions(db=db, skip=skip, limit=limit)

@app.put("/edit-interaction/{interaction_id}", response_model=schemas.Interaction)
def edit_interaction(interaction_id: int, interaction: schemas.InteractionUpdate, db: Session = Depends(get_db)):
    updated = crud.update_interaction(db=db, interaction_id=interaction_id, interaction=interaction)
    if not updated:
        raise HTTPException(status_code=404, detail="Interaction not found")
    return updated

@app.get("/get-hcp", response_model=schemas.HCP)
def get_hcp(name: str, db: Session = Depends(get_db)):
    hcp = crud.get_hcp_by_name(db=db, name=name)
    if not hcp:
        raise HTTPException(status_code=404, detail="HCP not found")
    return hcp

@app.post("/hcp", response_model=schemas.HCP)
def create_hcp(hcp: schemas.HCPCreate, db: Session = Depends(get_db)):
    return crud.create_hcp(db=db, hcp=hcp)

@app.post("/suggest-followup")
def suggest_followup(interaction_id: int, db: Session = Depends(get_db)):
    # Placeholder for AI logic later
    return {"suggestion": "Follow up in 1 week to check on product X interest."}

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat_with_agent(chat_request: ChatRequest):
    response = run_agent(chat_request.message)
    return {"reply": response}