from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import Quiz, Question, User
from schemas import QuizCreate, QuestionCreate
from auth import oauth2_scheme
import jwt

router = APIRouter()

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        user = db.query(User).filter(User.username == username).first()
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

@router.post("/quizzes")
def create_quiz(quiz: QuizCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if not user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
    new_quiz = Quiz(title=quiz.title, total_questions=quiz.total_questions, total_score=quiz.total_score, duration=quiz.duration)
    db.add(new_quiz)
    db.commit()
    db.refresh(new_quiz)
    return new_quiz

@router.get("/quizzes")
def get_quizzes(db: Session = Depends(get_db)):
    return db.query(Quiz).all()

@router.post("/quizzes/{quiz_id}/questions")
def add_question(quiz_id: int, question: QuestionCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if not user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
    new_question = Question(quiz_id=quiz_id, question_text=question.question_text, options=question.options, correct_option=question.correct_option)
    db.add(new_question)
    db.commit()
    db.refresh(new_question)
    return new_question
