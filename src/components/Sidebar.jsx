import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path

  const handleLogout = () => {
    navigate("/");
  };

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log("user", currentUser)
  console.log("user", currentUser?.role)

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">App Name</h2>
        <nav className="space-y-2">
          {/* Navigate to Profile */}
          <button
            onClick={() => navigate("/profile")}
            className={`block p-2 rounded transition w-full text-left ${
              location.pathname === "/profile"
                ? "bg-gray-700 font-semibold"
                : "hover:bg-gray-700"
            }`}
          >
            Profile
          </button>

          {/* Show Dashboard only for Admin */}
          {currentUser?.role === "admin" && (
            <button
              onClick={() => navigate("/dashboard")}
              className={`block p-2 rounded transition w-full text-left ${
                location.pathname === "/dashboard"
                  ? "bg-gray-700 font-semibold"
                  : "hover:bg-gray-700"
              }`}
            >
              Dashboard
            </button>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full text-left block p-2 rounded hover:bg-gray-700 transition"
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
