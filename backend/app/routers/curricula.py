from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, database, dependencies, models

router = APIRouter(prefix="/curricula", tags=["curricula"])

@router.get("/", response_model=List[schemas.CurriculumResponse])
def list_curricula(db: Session = Depends(database.get_db), user: models.User = Depends(dependencies.get_current_user)):
    return crud.get_curricula(db, org_id=user.organization_id)

@router.post("/", response_model=schemas.CurriculumResponse)
def create_curriculum(curr: schemas.CurriculumCreate, db: Session = Depends(database.get_db), user: models.User = Depends(dependencies.get_current_user)):
    if not user.organization_id:
        raise HTTPException(status_code=400, detail="User must belong to an organization")
    return crud.create_curriculum(db, curr, user.organization_id)