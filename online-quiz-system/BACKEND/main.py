from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth import router as auth_router
from quiz import router as quiz_router
from users import router as user_router
from database import engine, Base

# Initialize database
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(quiz_router)
app.include_router(user_router)

@app.get("/")
def home():
    return {"message": "Welcome to the Online Quiz System"}
