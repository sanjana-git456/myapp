from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float, Boolean, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="educator") # ngo_admin, educator, donor
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True)
    
    organization = relationship("Organization", back_populates="members")

class Organization(Base):
    __tablename__ = "organizations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    slug = Column(String, unique=True)
    theme_color = Column(String, default="#4f46e5")
    
    members = relationship("User", back_populates="organization")
    curricula = relationship("Curriculum", back_populates="organization")

class Curriculum(Base):
    __tablename__ = "curricula"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    organization_id = Column(Integer, ForeignKey("organizations.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    organization = relationship("Organization", back_populates="curricula")
    modules = relationship("ModuleAssignment", back_populates="curriculum")

class AssessmentModule(Base):
    __tablename__ = "assessment_modules"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(Text)
    module_type = Column(String) # quiz, survey, peer_review
    is_public = Column(Boolean, default=True)
    
    assignments = relationship("ModuleAssignment", back_populates="module")

class ModuleAssignment(Base):
    __tablename__ = "module_assignments"
    id = Column(Integer, primary_key=True, index=True)
    curriculum_id = Column(Integer, ForeignKey("curricula.id"))
    module_id = Column(Integer, ForeignKey("assessment_modules.id"))
    
    curriculum = relationship("Curriculum", back_populates="modules")
    module = relationship("AssessmentModule", back_populates="assignments")
    results = relationship("ModuleResult", back_populates="assignment")

class ModuleResult(Base):
    __tablename__ = "module_results"
    id = Column(Integer, primary_key=True, index=True)
    assignment_id = Column(Integer, ForeignKey("module_assignments.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    score = Column(Float)
    completed_at = Column(DateTime(timezone=True), server_default=func.now())

    assignment = relationship("ModuleAssignment", back_populates="results")