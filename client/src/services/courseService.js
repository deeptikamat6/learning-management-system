import axios from "axios";

const API = "http://localhost:5000/api/course";

export const createCourse = async (courseData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(API, courseData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getAllCourses = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const getCourseById = async (id) => {
  const response = await axios.get(`${API}/${id}`);
  return response.data;
};