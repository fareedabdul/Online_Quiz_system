-- Create the database (Run this in PostgreSQL before using the API)
CREATE DATABASE quizdb;

-- Switch to the database
\c quizdb;

-- Create Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

-- Create Quizzes Table
CREATE TABLE quizzes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    total_questions INT NOT NULL,
    total_score INT NOT NULL,
    duration INT NOT NULL
);

-- Create Questions Table
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    quiz_id INT REFERENCES quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL
);

-- Create Question Options Table
CREATE TABLE question_options (
    id SERIAL PRIMARY KEY,
    question_id INT REFERENCES questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE
);

-- Create Quiz Attempts Table
CREATE TABLE quiz_attempts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    quiz_id INT REFERENCES quizzes(id) ON DELETE CASCADE,
    score INT DEFAULT NULL,
    completed BOOLEAN DEFAULT FALSE
);

-- Create Quiz Responses Table
CREATE TABLE quiz_responses (
    id SERIAL PRIMARY KEY,
    attempt_id INT REFERENCES quiz_attempts(id) ON DELETE CASCADE,
    question_id INT REFERENCES questions(id) ON DELETE CASCADE,
    selected_option_id INT REFERENCES question_options(id) ON DELETE CASCADE,
    is_correct BOOLEAN DEFAULT FALSE
);

-- Insert Sample Users (admin and normal user)
INSERT INTO users (username, password, is_admin) VALUES 
('admin', '$2b$12$examplehashedpassword', TRUE), -- Replace with a bcrypt-hashed password
('user1', '$2b$12$examplehashedpassword', FALSE);
