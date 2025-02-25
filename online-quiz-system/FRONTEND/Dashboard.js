import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const response = await axios.get("http://localhost:8000/my-quizzes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizzes(response.data);
      } catch (err) {
        console.error("Error fetching quizzes", err);
      }
    };
    fetchQuizzes();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id} onClick={() => navigate(`/quiz/${quiz.id}`)}>{quiz.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
