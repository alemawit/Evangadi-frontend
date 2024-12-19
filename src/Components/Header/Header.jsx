import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from "./Header.module.css"; // Import the CSS file for styling
import logo from "../../assets/image/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = ({ user, loading }) => {
  const [menuOpen, setMenuOpen] = useState(false); // Track dropdown menu visibility
  const location = useLocation(); // Get the current route
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token from storage
    alert("User logged out successfully!");
    window.location.href = "/login"; // Redirect to authentication page
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev); // Toggle menu visibility
  };

  // Close the menu when navigating to a different page
  const closeMenuOnNavigate = () => {
    setMenuOpen(false);
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__logo}>
        <Link to={"/login"}>
          <img
            src={logo}
            alt="Evangadi Logo"
            className={classes.header__logoimg}
          />
        </Link>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <div className={classes.header__hamburger} onClick={toggleMenu}>
        <RxHamburgerMenu className={classes.header__hamburgerIcon} />
      </div>

      {/* Links / Dropdown Menu */}
      <div
        className={`${classes.link_wapper} ${
          menuOpen ? classes.link_wapper_active : ""
        }`}
      >
        {/* Show specific links based on the current route */}
        <nav className={classes.header__nav}>
          <Link
            to="/home"
            className={classes.header__link}
            onClick={closeMenuOnNavigate}
          >
            Home
          </Link>
          <Link
            to="/how-it-works"
            className={classes.header__link}
            onClick={closeMenuOnNavigate}
          >
            How it works
          </Link>
        </nav>

        {/* Authentication Buttons */}
        <div className={classes.header__auth}>
          {user ? (
            <button
              className={classes.header__button_Logout}
              onClick={handleLogout}
            >
              LOG OUT
            </button>
          ) : (
            <Link to="/login">
              <button
                className={classes.header__button}
                onClick={closeMenuOnNavigate}
              >
                SIGN IN
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
