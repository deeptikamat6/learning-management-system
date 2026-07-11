import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

import { getCourseById } from "../services/courseService";
import { getLessonsByCourse } from "../services/lessonService";


import ProgressBar from "../components/ProgressBar";
import { getCourseProgress } from "../services/progressService";


function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    fetchCourse();
    fetchLessons();
    fetchProgress();
  }, []);

  const fetchCourse = async () => {
    try {
      const data = await getCourseById(id);
      setCourse(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLessons = async () => {
    try {
      const data = await getLessonsByCourse(id);
      setLessons(data);
    } catch (error) {
      console.error(error);
    }
  };

//   const fetchProgress = async () => {
//   try {

//     const data = await getCourseProgress(id);

//     setProgress(data);

//   } catch (error) {

//     console.error(error);

//   }
// };

  if (!course) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-8">

        <h1 className="text-4xl font-bold">
          {course.title}
          </h1>

          {course.thumbnail && (
  <img
    src={course.thumbnail}
    alt={course.title}
    className="w-full h-80 object-cover rounded-xl my-6"
  />
)}
        

        <p className="mt-4 text-gray-600">
          {course.description}
        </p>

        <p className="mt-4">
          <strong>Category:</strong> {course.category}
        </p>

        <p>
          <strong>Price:</strong> ₹{course.price}
        </p>

        <p>
          <strong>Instructor:</strong>{" "}
          {course.instructor?.name}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          Lessons
        </h2>

        <div className="space-y-3">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="border rounded-lg p-4"
            >
              <h3 className="font-semibold">
                {lesson.order}. {lesson.title}
              </h3>

              <p className="text-gray-500">
                {lesson.description}
              </p>
            </div>
          ))}
        </div>

        <button className="mt-8 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
          Enroll Now
        </button>

        {/* {progress && (
  <ProgressBar
    percentage={progress.progressPercentage}
  />
)} */}

      </div>
    </>
  );
}

export default CourseDetails;