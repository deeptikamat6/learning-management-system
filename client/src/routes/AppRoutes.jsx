import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Courses from "../pages/Courses";
import CourseDetails from "../pages/CourseDetails";
import MyCourses from "../pages/MyCourses";
import Profile from "../pages/Profile";
import CreateCourse from "../pages/CreateCourse";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/courses" element={<Courses />} />

        <Route path="/courses/:id" element={<CourseDetails />} />

        <Route path="/my-courses" element={<MyCourses />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/create-course" element={<CreateCourse />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;