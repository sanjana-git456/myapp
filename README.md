# NGO Learning Network

A modular, API-first platform for NGOs, schools, and corporate partners to manage educational content and track impact.

## Tech Stack
- **Backend**: FastAPI (Python), SQLAlchemy, PostgreSQL
- **Frontend**: React (Vite), Tailwind CSS, React Query
- **Auth**: JWT (JSON Web Tokens)

## Setup Instructions

### Backend
1. Navigate to `backend/`
2. Create a virtual environment: `python -m venv venv`
3. Activate it: `source venv/bin/activate` (or `venv\Scripts\activate` on Windows)
4. Install dependencies: `pip install -r requirements.txt`
5. Set up your `.env` file (see `.env.example`)
6. Run the server: `uvicorn app.main:app --reload`

### Frontend
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Run the dev server: `npm run dev`

## Key Features
- **Modular Curricula**: Create and manage educational paths.
- **Marketplace**: Reusable assessment modules (Quizzes, Surveys).
- **Analytics**: Real-time cohort performance tracking.
- **Role-based Access**: Specific views for NGOs, Educators, and Donors.