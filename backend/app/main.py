import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base, SessionLocal
from . import models, crud, schemas
from .routers import auth, curricula, analytics, marketplace

Base.metadata.create_all(bind=engine)

app = FastAPI(title="NGO Learning Network API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(curricula.router, prefix="/api")
app.include_router(analytics.router, prefix="/api")
app.include_router(marketplace.router, prefix="/api")

@app.on_event("startup")
def seed_data():
    if os.getenv("SEED_DEMO_DATA") == "true":
        db = SessionLocal()
        # Check if org exists
        if not db.query(models.Organization).first():
            org = models.Organization(name="Global Education NGO", slug="global-edu", theme_color="#10b981")
            db.add(org)
            db.commit()
            db.refresh(org)
            
            # Seed modules
            m1 = models.AssessmentModule(name="Basic Literacy Quiz", description="Foundational reading assessment", module_type="quiz")
            m2 = models.AssessmentModule(name="Community Impact Survey", description="Measure local engagement", module_type="survey")
            db.add_all([m1, m2])
            
            # Seed curriculum
            c1 = models.Curriculum(title="English for Rural Schools", description="A 12-week intensive program", organization_id=org.id)
            db.add(c1)
            db.commit()
        db.close()

@app.get("/")
def root():
    return {"message": "NGO Learning Network API is running"}