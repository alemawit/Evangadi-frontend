import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AuthUser({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/auth"); // Navigate to auth page
  };

  return (
    <nav className="bg-black h-20 p-2 sticky z-50 inset-x-0 top-0 shadow-md">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="text-white font-bold text-3xl mb-4 lg:mb-0 hover:text-orange-600 hover:cursor-pointer">
          {/* Logo placeholder */}
        </div>

        {user && user.username ? (
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/auth"
            className="text-white px-4 py-2 hover:text-orange-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default AuthUser;
