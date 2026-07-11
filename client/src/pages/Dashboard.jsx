import Navbar from "../components/Navbar";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center h-[80vh]">

        <div className="text-center">

          <h1 className="text-4xl font-bold">
            Welcome
          </h1>

          <p className="text-2xl mt-4">
            {user?.name}
          </p>

          <p className="text-gray-500">
            {user?.role}
          </p>

        </div>

      </div>

    </>
  );
}

export default Dashboard;