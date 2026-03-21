from sqlalchemy.orm import Session
import models, schemas

def get_hcp_by_name(db: Session, name: str):
    return db.query(models.HCP).filter(models.HCP.name.ilike(f"%{name}%")).first()

def create_hcp(db: Session, hcp: schemas.HCPCreate):
    db_hcp = models.HCP(**hcp.dict())
    db.add(db_hcp)
    db.commit()
    db.refresh(db_hcp)
    return db_hcp

def get_interactions(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Interaction).offset(skip).limit(limit).all()

def create_interaction(db: Session, interaction: schemas.InteractionCreate):
    db_interaction = models.Interaction(**interaction.dict())
    db.add(db_interaction)
    db.commit()
    db.refresh(db_interaction)
    return db_interaction

def update_interaction(db: Session, interaction_id: int, interaction: schemas.InteractionUpdate):
    db_interaction = db.query(models.Interaction).filter(models.Interaction.id == interaction_id).first()
    if db_interaction:
        update_data = interaction.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_interaction, key, value)
        db.commit()
        db.refresh(db_interaction)
    return db_interaction
