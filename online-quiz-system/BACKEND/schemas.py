from pydantic import BaseModel
from typing import List, Optional

# User Schema
class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_admin: bool

    class Config:
        from_attributes = True

# Authentication Schema (For Login)
class TokenData(BaseModel):
    username: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str

# Quiz Schema
class QuizBase(BaseModel):
    title: str
    total_questions: int
    total_score: int
    duration: int

class QuizCreate(QuizBase):
    pass

class QuizResponse(QuizBase):
    id: int

    class Config:
        from_attributes = True

# Question Schema
class QuestionBase(BaseModel):
    question_text: str

class QuestionCreate(QuestionBase):
    quiz_id: int

class QuestionResponse(QuestionBase):
    id: int

    class Config:
        from_attributes = True

# Question Option Schema
class QuestionOptionBase(BaseModel):
    option_text: str
    is_correct: bool

class QuestionOptionCreate(QuestionOptionBase):
    question_id: int

class QuestionOptionResponse(QuestionOptionBase):
    id: int

    class Config:
        from_attributes = True

# Quiz Attempt Schema
class QuizAttemptBase(BaseModel):
    quiz_id: int

class QuizAttemptCreate(QuizAttemptBase):
    pass

class QuizAttemptResponse(QuizAttemptBase):
    id: int
    user_id: int
    score: Optional[int]
    completed: bool

    class Config:
        from_attributes = True

# Quiz Response Schema
class QuizResponseBase(BaseModel):
    question_id: int
    selected_option_id: int

class QuizResponseCreate(QuizResponseBase):
    pass

class QuizResponseResult(QuizResponseBase):
    is_correct: bool

    class Config:
        from_attributes = True
