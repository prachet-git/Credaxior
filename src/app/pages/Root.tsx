import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Root() {
  const navigate = useNavigate();

  const [, forceUpdate] = useState({});

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();

    
    forceUpdate({});

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollRestoration />

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-6 py-3 bg-gray-900 text-white shadow">
        <h2
          className="text-lg font-semibold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Credaxior
        </h2>

        <div className="flex items-center gap-4">
          {/* ROLE */}
          {token && role && (
            <span className="text-sm bg-gray-700 px-3 py-1 rounded">
              {role}
            </span>
          )}

          {/* HOME */}
          <button
            onClick={() => navigate("/")}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded text-sm"
          >
            Home
          </button>

          {/* AUTH BUTTONS */}
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-sm"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded text-sm"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded text-sm"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>

      <Outlet />
    </div>
  );
}

