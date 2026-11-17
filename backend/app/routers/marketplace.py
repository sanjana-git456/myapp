from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, database

router = APIRouter(prefix="/marketplace", tags=["marketplace"])

@router.get("/modules", response_model=List[schemas.AssessmentModuleResponse])
def list_modules(db: Session = Depends(database.get_db)):
    return crud.get_assessment_modules(db)