import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const QuizAttempt = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8000/quizzes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuiz(response.data);
        setQuestions(response.data.questions);
      } catch (err) {
        console.error("Error fetching quiz", err);
      }
    };
    fetchQuiz();
  }, [id, navigate]);

  const handleAnswer = (questionId, answer) => {
    setResponses({ ...responses, [questionId]: answer });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(`http://localhost:8000/quizzes/${id}/submit`, { responses }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Quiz submitted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error submitting quiz", err);
    }
  };

  return (
    <div className="quiz-attempt-container">
      {quiz ? (
        <>
          <h2>{quiz.title}</h2>
          {questions.map((q) => (
            <div key={q.id}>
              <p>{q.question}</p>
              {q.options.map((option) => (
                <button key={option} onClick={() => handleAnswer(q.id, option)}>{option}</button>
              ))}
            </div>
          ))}
          <button onClick={handleSubmit}>Submit Quiz</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default QuizAttempt;
