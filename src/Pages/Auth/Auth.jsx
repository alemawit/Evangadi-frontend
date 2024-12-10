import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import About from "../About/About";
import classes from "./Auth.module.css"; // Use the same CSS file for styling

const Auth = () => {
  const navigate = useNavigate();

  // Switch to Register page
  const switchToCreateAccount = () => {
    navigate("/auth/register"); // Navigate to the Register page
  };

  // Switch to Login page
  const switchToLogin = () => {
    navigate("/auth/login"); // Navigate to the Login page
  };

  return (
    <div className={classes.container_wrapper}>
      <Routes>
        {/* Default Route for Auth */}
        <Route
          path="/"
          element={<Login switchToCreateAccount={switchToCreateAccount} />}
        />

        {/* Route for Login */}
        <Route
          path="/login"
          element={<Login switchToCreateAccount={switchToCreateAccount} />}
        />

        {/* Route for Register */}
        <Route
          path="/register"
          element={<Register switchToLogin={switchToLogin} />}
        />
      </Routes>

      {/* Keep About component visible across all Auth pages */}
      <About />
    </div>
  );
};

export default Auth;
