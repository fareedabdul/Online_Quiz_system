import axios from "axios";

const API_URL = "http://localhost:8000";

export const login = (credentials) => axios.post(`${API_URL}/token`, credentials);

export const getQuizzes = (token) =>
  axios.get(`${API_URL}/my-quizzes`, { headers: { Authorization: `Bearer ${token}` } });

export const submitQuiz = (quizId, responses, token) =>
  axios.post(`${API_URL}/quizzes/${quizId}/submit`, { responses }, { headers: { Authorization: `Bearer ${token}` } });
