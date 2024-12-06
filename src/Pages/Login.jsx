import React, { useRef, useState } from "react";
import axiosBase from "../axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import classes from "./Login.module.css"; // CSS file for styling
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Login() {
  const navigate = useNavigate();
  const emailDom = useRef(null);
  const passwordDom = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passwordValue = emailDom.current.value;

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
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={classes.container_wrapper}>
      <section className={classes.loginContainer}>
        <div className={classes.loginBox}>
          <h2 className={classes.title}>Login to your account</h2>
          <p className={classes.create_account_para}>
            Don’t have an account?{" "}
            <Link to="/register" className={classes.registerLink}>
              Create a new account
            </Link>
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
      <section className={classes.aboutContainer}>
        <div className={classes.aboutBox}>
          <p className={classes.title_abt}>About</p>
          <h1 className={classes.subtitle}>Evangadi Networks</h1>
          <p className={classes.description}>
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
          </p>
          <br />
          <p className={classes.description}>
            Whether you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
          <Link to="/how-it-works" className={classes.howItWorksButton}>
            HOW IT WORKS
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Login;
