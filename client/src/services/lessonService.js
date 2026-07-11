import axios from "axios";

const API = "http://localhost:5000/api/lesson";

export const getLessonsByCourse = async (courseId) => {
  const response = await axios.get(`${API}/course/${courseId}`);
  return response.data;
};