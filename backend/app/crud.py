from sqlalchemy.orm import Session
from sqlalchemy import func
from . import models, schemas, security

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = security.get_password_hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_curricula(db: Session, org_id: int = None):
    query = db.query(models.Curriculum)
    if org_id:
        query = query.filter(models.Curriculum.organization_id == org_id)
    return query.all()

def create_curriculum(db: Session, curriculum: schemas.CurriculumCreate, org_id: int):
    db_curr = models.Curriculum(**curriculum.model_dump(), organization_id=org_id)
    db.add(db_curr)
    db.commit()
    db.refresh(db_curr)
    return db_curr

def get_assessment_modules(db: Session, public_only: bool = True):
    query = db.query(models.AssessmentModule)
    if public_only:
        query = query.filter(models.AssessmentModule.is_public == True)
    return query.all()

def get_analytics(db: Session, org_id: int):
    total_curr = db.query(models.Curriculum).filter(models.Curriculum.organization_id == org_id).count()
    total_students = db.query(models.User).filter(models.User.organization_id == org_id, models.User.role == 'educator').count()
    avg_score = db.query(func.avg(models.ModuleResult.score)).join(models.ModuleAssignment).join(models.Curriculum).filter(models.Curriculum.organization_id == org_id).scalar() or 0.0
    return {
        "total_curricula": total_curr,
        "total_students": total_students,
        "average_score": round(float(avg_score), 2),
        "completion_rate": 0.85 # Mock logic for completion
    }