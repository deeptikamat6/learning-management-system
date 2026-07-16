import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMyCourses } from "../services/enrollmentService";

function MyCourses() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {

      const data = await getMyCourses();

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
          My Courses
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {courses
              .filter((item) => item.course)
              .map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg p-5"
            >

              <h2 className="text-xl font-bold">
                {item.course?.title}
              </h2>

              <p className="mt-2 text-gray-600">
                {item.course?.description}
              </p>

              <p className="mt-3">
                Instructor:
                {" "}
                {item.course?.instructor?.name}
              </p>

              <p>
                ₹ {item.course.price}
              </p>

            </div>

          ))}

        </div>

      </div>

    </>
  );
}

export default MyCourses;