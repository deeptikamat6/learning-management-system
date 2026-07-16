import Navbar from "../components/Navbar";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">

        <div className="flex flex-col items-center">

          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold mt-4">
            {user?.name}
          </h1>

          <p className="text-gray-500">
            {user?.email}
          </p>

        </div>

        <div className="mt-8 space-y-4">

          <div className="border rounded-lg p-4">
            <h2 className="font-semibold">Role</h2>
            <p className="text-gray-600 capitalize">
              {user?.role}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="font-semibold">Name</h2>
            <p className="text-gray-600">
              {user?.name}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="font-semibold">Email</h2>
            <p className="text-gray-600">
              {user?.email}
            </p>
          </div>

        </div>

      </div>
    </>
  );
}

export default Profile;