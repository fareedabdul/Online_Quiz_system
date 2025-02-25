import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [totalScore, setTotalScore] = useState(100);
  const [duration, setDuration] = useState(30);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/quizzes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes(response.data);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
    }
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/quizzes",
        { title, total_questions: totalQuestions, total_score: totalScore, duration },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchQuizzes();
      setTitle("");
      setTotalQuestions(10);
      setTotalScore(100);
      setDuration(30);
    } catch (err) {
      setError("Failed to create quiz. Please try again.");
      console.error("Error creating quiz:", err);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      
      <form onSubmit={handleCreateQuiz}>
        <h3>Create New Quiz</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input type="text" placeholder="Quiz Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="number" placeholder="Total Questions" value={totalQuestions} onChange={(e) => setTotalQuestions(e.target.value)} required />
        <input type="number" placeholder="Total Score" value={totalScore} onChange={(e) => setTotalScore(e.target.value)} required />
        <input type="number" placeholder="Duration (minutes)" value={duration} onChange={(e) => setDuration(e.target.value)} required />
        <button type="submit">Create Quiz</button>
      </form>

      <h3>Existing Quizzes</h3>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>{quiz.title} - {quiz.total_questions} Questions</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
