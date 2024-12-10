import React, { useRef, useState } from "react";
import axiosBase from "../../axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import classes from "./Register.module.css"; // Use the same CSS file for styling
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Register = ({ switchToLogin }) => {
  const navigate = useNavigate();
  const emailDom = useRef(null);
  const passwordDom = useRef(null);
  const usernameDom = useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameValue = usernameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    const firstNameValue = firstNameDom.current.value;
    const lastNameValue = lastNameDom.current.value;
    console.log("Username:", usernameValue);
    console.log("Email:", emailValue);
    console.log("Password:", passwordValue);
    console.log("First Name:", firstNameValue);
    console.log("Last Name:", lastNameValue);

    if (
      !usernameValue ||
      !emailValue ||
      !passwordValue ||
      !firstNameValue ||
      !lastNameValue
    ) {
      alert("Please provide all required information!");
      return;
    }
console.log({
  username: usernameValue,
  email: emailValue,
  password: passwordValue,
  firstName: firstNameValue,
  lastName: lastNameValue,
});

    try {
      const { data } = await axiosBase.post("/users/register", {
        username: usernameValue,
        email: emailValue,
        password: passwordValue,
        firstname: firstNameValue,
        lastname: lastNameValue,
        
      });
    

      alert("Account created successfully!");
      localStorage.setItem("token", data.token);
      navigate("/login"); // Redirect to the home page after account creation
    } catch (error) {
      alert(error?.response?.data?.msg || "Account creation failed!");
      console.log(error.response);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className={classes.loginContainer}>
      <div className={classes.loginBox}>
        <h2 className={classes.title}>Join the network</h2>
        <p className={classes.create_account_para}>
          Already have an account?{" "}
          <span onClick={switchToLogin} className={classes.registerLink}>
            Sign in
          </span>
        </p>
        <form onSubmit={handleSubmit}>
          <div className={classes.inputGroup}>
            <input
              ref={usernameDom}
              type="text"
              placeholder="Username"
              className={classes.inputField}
            />
          </div>
          <div className={classes.inputGroup}>
            <input
              ref={emailDom}
              type="email"
              placeholder="Email address"
              className={classes.inputField}
            />
          </div>
          
            <div className={classes.field}>
              <input
                ref={firstNameDom}
                type="text"
                placeholder="First name"
                className={classes.inputGroup}
              />

              <input
                ref={lastNameDom}
                type="text"
                placeholder="Last name"
                className={classes.inputGroup}
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
          <div className={classes.inputGroup}>
            <h4 className={classes.privacyLabel}>
              I agree to the <Link>privacy policy</Link> and
              <Link>terms of service</Link>.
            </h4>
          </div>
          <button type="submit" className={classes.loginButton}>
            Agree and Join
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
