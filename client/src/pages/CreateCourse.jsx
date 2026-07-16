import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createCourse } from "../services/courseService";

function CreateCourse() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });

  const [thumbnail, setThumbnail] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);

      if (thumbnail) {
        data.append("thumbnail", thumbnail);
      }

      await createCourse(data);

      alert("Course Created Successfully!");

      navigate("/courses");
    } catch (error) {
      console.error(error);
      alert("Failed to create course");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6">
          Create Course
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <textarea
            name="description"
            placeholder="Course Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Create Course
          </button>

        </form>
      </div>
    </>
  );
}

export default CreateCourse;