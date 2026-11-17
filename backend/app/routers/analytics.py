from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas, database, dependencies, models

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/summary", response_model=schemas.AnalyticsSummary)
def get_org_analytics(db: Session = Depends(database.get_db), user: models.User = Depends(dependencies.get_current_user)):
    if not user.organization_id:
        return {"total_curricula": 0, "total_students": 0, "average_score": 0.0, "completion_rate": 0.0}
    return crud.get_analytics(db, user.organization_id)