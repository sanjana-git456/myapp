from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: EmailStr
    role: str = "educator"

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    organization_id: Optional[int] = None
    class Config:
        from_attributes = True

class Token(BaseModel):
    access: str
    user: UserResponse

class LoginRequest(BaseModel):
    username: str
    password: str

class OrganizationBase(BaseModel):
    name: str
    slug: str
    theme_color: str

class OrganizationResponse(OrganizationBase):
    id: int
    class Config:
        from_attributes = True

class CurriculumBase(BaseModel):
    title: str
    description: str

class CurriculumCreate(CurriculumBase):
    pass

class CurriculumResponse(CurriculumBase):
    id: int
    organization_id: int
    created_at: datetime
    class Config:
        from_attributes = True

class AssessmentModuleBase(BaseModel):
    name: str
    description: str
    module_type: str
    is_public: bool = True

class AssessmentModuleResponse(AssessmentModuleBase):
    id: int
    class Config:
        from_attributes = True

class AnalyticsSummary(BaseModel):
    total_curricula: int
    total_students: int
    average_score: float
    completion_rate: float