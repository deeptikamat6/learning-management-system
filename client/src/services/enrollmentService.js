import axios from "axios";

const API = "http://localhost:5000/api/enrollment";

export const getMyCourses = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API}/my-courses`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};