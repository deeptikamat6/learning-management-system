import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        LMS
      </h1>

      <div className="flex gap-6 items-center">

        <Link to="/">Dashboard</Link>

        <Link to="/courses">Courses</Link>

        <Link to="/my-courses">My Courses</Link>

        <Link to="/profile">Profile</Link>

        <span className="font-semibold">
          {user?.name}
        </span>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;