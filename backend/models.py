from sqlalchemy import Column, Integer, String, Text
from database import Base

class HCP(Base):
    __tablename__ = "hcps"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    specialty = Column(String)
    contact = Column(String)

class Interaction(Base):
    __tablename__ = "interactions"
    id = Column(Integer, primary_key=True, index=True)
    hcp_name = Column(String, index=True)
    date = Column(String)
    interaction_type = Column(String)
    notes = Column(Text)
    sentiment = Column(String)
    follow_up = Column(Text)
    summary = Column(Text)
