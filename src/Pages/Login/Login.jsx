import React, { useRef, useState } from "react";
import axiosBase from "../../axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import classes from "./Login.module.css"; // CSS file for styling
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Login = ({ switchToCreateAccount }) => {
  const navigate = useNavigate();
  const emailDom = useRef(null);
  const passwordDom = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (!emailValue || !passwordValue) {
      alert("Please provide all required information!");
      return;
    }

    try {
      const { data } = await axiosBase.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });

      alert("Login successful! Please visit the home page.");
      localStorage.setItem("token", data.token);
      navigate("/"); // Redirect to the home page after login
    } catch (error) {
      alert(error?.response?.data?.msg || "Login failed!");
      console.log(error.response);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className={classes.loginContainer}>
      <div className={classes.loginBox}>
        <h2 className={classes.title}>Login to your account</h2>
        <p className={classes.create_account_para}>
          Don’t have an account?{" "}
          <span
            onClick={switchToCreateAccount} // Trigger switch to register page
            className={classes.registerLink}
          >
            Create a new account
          </span>
        </p>
        <form onSubmit={handleSubmit}>
          <div className={classes.inputGroup}>
            <input
              ref={emailDom}
              type="email"
              placeholder="Email address"
              className={classes.inputField}
            />
          </div>
          <div className={classes.inputGroup}>
            <div className={classes.passwordWrapper}>
              <input
                ref={passwordDom}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={classes.inputField}
              />
              <span
                onClick={togglePasswordVisibility}
                className={classes.togglePassword}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </span>
            </div>
          </div>
          <Link to="/forgot-password" className={classes.forgotPassword}>
            Forgot password?
          </Link>
          <button type="submit" className={classes.loginButton}>
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
