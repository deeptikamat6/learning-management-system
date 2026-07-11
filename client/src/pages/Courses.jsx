import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllCourses } from "../services/courseService";
import { Link } from "react-router-dom";


function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">
          All Courses
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {courses.map((course) => (
  <Link
    to={`/courses/${course._id}`}
    key={course._id}
  >
    <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition">
      {course.thumbnail && (
  <img
    src={course.thumbnail}
    alt={course.title}
    className="w-full h-48 object-cover rounded-lg mb-4"
  />
)}
      
      <h2 className="text-xl font-bold">
        {course.title}
      </h2>

      <p className="mt-2 text-gray-600">
        {course.description}
      </p>

      <p className="mt-3 font-semibold">
        Category: {course.category}
      </p>

      <p className="font-semibold">
        ₹ {course.price}
      </p>

      <p className="mt-2 text-blue-600">
        Instructor: {course.instructor?.name}
      </p>
    </div>
  </Link>
))}

        </div>

      </div>
    </>

  );
}

export default Courses;