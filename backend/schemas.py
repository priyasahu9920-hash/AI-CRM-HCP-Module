from pydantic import BaseModel
from typing import Optional

class HCPBase(BaseModel):
    name: str
    specialty: str
    contact: str

class HCPCreate(HCPBase):
    pass

class HCP(HCPBase):
    id: int
    class Config:
        orm_mode = True

class InteractionBase(BaseModel):
    hcp_name: str
    date: str
    interaction_type: str
    notes: str
    sentiment: Optional[str] = None
    follow_up: Optional[str] = None
    summary: Optional[str] = None

class InteractionCreate(InteractionBase):
    pass

class InteractionUpdate(BaseModel):
    hcp_name: Optional[str] = None
    date: Optional[str] = None
    interaction_type: Optional[str] = None
    notes: Optional[str] = None
    sentiment: Optional[str] = None
    follow_up: Optional[str] = None
    summary: Optional[str] = None

class Interaction(InteractionBase):
    id: int
    class Config:
        orm_mode = True
