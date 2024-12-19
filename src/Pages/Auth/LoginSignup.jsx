import React from "react";
import classes from "./LoginSignup.module.css";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
// import Header from "../Header/Header";
import axios from "../../Axios/Axios";
// import Aso from "aos";

function LoginSignup() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailSignupRef = useRef();
  const passwordSignupRef = useRef();

  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [signupErrorMessage, setSignupErrorMessage] = useState("");

  // Toggle between login and signup forms
  const handleLoginLinkClick = (e) => {
    e.preventDefault();
    setIsLoginVisible(false);
  };

  const handleSignupLinkClick = (e) => {
    e.preventDefault();
    setIsLoginVisible(true);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  // Handle login form submission
  async function handleLoginSubmit(e) {
    e.preventDefault();
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    if (!emailValue || !passwordValue) {
      setLoginErrorMessage("Please Enter Email and Password");
      return;
    }
    try {
      const { data } = await axios.post("api/users/login", {
        email: emailValue,
        password: passwordValue,
      });
      alert("Successfully logged in.");
      navigate("/home");
      localStorage.setItem("token", data.token);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    }
  }

  // Handle signup form submission
  async function handleSignupSubmit(e) {
    e.preventDefault();

    const usernameValue = usernameRef.current.value;
    const firstValue = firstNameRef.current.value;
    const lastValue = lastNameRef.current.value;
    const emailSignupValue = emailSignupRef.current.value;
    const passwordSignupValue = passwordSignupRef.current.value;
    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailSignupValue ||
      !passwordSignupValue
    ) {
      setSignupErrorVisible(false);
      setSignupErrorMessage("ALL fields are required");
      return;
    }
    try {
      await axios.post("api/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailSignupValue,
        password: passwordSignupValue,
      });
      alert("The user has successfully registered");
      navigate("/login");
      usernameRef.current.value = "";
      firstNameRef.current.value = "";
      lastNameRef.current.value = "";
      emailSignupRef.current.value = "";
      passwordSignupRef.current.value = null;
      setIsLoginVisible(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } finally {
      if (signupErrorVisible) {
        setIsLoginVisible(true);
      }
    }
  }
  const navigation = [{ name: "", href: "#" }];
//   Aso.init();
  return (
    
      
      <div className={classes.mainContainer}> {/* <Header navigation={navigation} RightText={"Home"} /> */}
        <div className={classes.middlePart}>
          {isLoginVisible ? (
            <div className={`${classes.loginForm} `}>
              <h3>Login to your account</h3>
              <span>
                <p>
                  Don’t have an account?{" "}
                  <Link onClick={handleLoginLinkClick} to=" ">
                    Create a new account
                  </Link>
                </p>
              </span>
              <div className={classes.loginFormOnly}>
                <div
                  style={{
                    color: "red",
                    textAlign: "center",
                  }}
                >
                  {loginErrorMessage}
                </div>
                <form action="" onSubmit={handleLoginSubmit}>
                  <div className={classes.password}>
                    <input
                      ref={emailRef}
                      type="email"
                      placeholder="Email address"
                    />
                  </div>

                  <div className={classes.password}>
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      ref={passwordRef}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                    <span
                      className={classes.password_toggle_icon}
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                  <div className={classes.forgotpassword}>
                    <Link>Forgot password?</Link>
                  </div>
                  <div>
                    <button type="submit" className={classes.loginButton}>
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className={`${classes.signForm} `}>
              <h3>Join the network</h3>
              <span>
                <p>
                  Already have an account?
                  <Link onClick={handleSignupLinkClick} to=" ">
                    Sign in
                  </Link>
                </p>
              </span>
              <div>
                <div
                  style={{
                    color: "red",
                    textAlign: "center",
                    paddingBottom: "5px",
                  }}
                >
                  {signupErrorMessage}
                </div>
                <form action="" onSubmit={handleSignupSubmit}>
                  <div className={classes.same}>
                    <input
                      ref={usernameRef}
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                  <div className={classes.field} style={{ border: "none" }}>
                    <input
                      ref={firstNameRef}
                      type="text"
                      placeholder="First name"
                    />
                    <input
                      ref={lastNameRef}
                      type="text"
                      placeholder="Last name"
                    />
                  </div>
                  <div className={classes.same}>
                    <input
                      ref={emailSignupRef}
                      type="email"
                      placeholder="Email address"
                    />
                  </div>

                  <div className={classes.same}>
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      ref={passwordSignupRef}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                    <span
                      className={classes.password_toggle_icon2}
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>

                  <h4 className={classes.agree}>
                    I agree to the <Link>privacy policy</Link> and
                    <Link>terms of service</Link>.
                  </h4>
                  <button type="submit" className={classes.join}>
                    Agree and Join
                  </button>
                  <h4>
                    <Link
                      onClick={handleSignupLinkClick}
                      className={classes.account}
                    >
                      Already have an account?
                    </Link>
                  </h4>
                </form>
              </div>
            </div>
          )}
          <div className={classes.about}>
            <h3>About</h3>
            <h1>Evangadi Networks</h1>
            <p>
              No matter what stage of life you are in, whether you’re just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>
            <p>
              Whether you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>

            <button className={classes.howBtn}>HOW IT WORKS</button>
          </div>
        </div>
      </div>
    
  );
}

export default LoginSignup;
