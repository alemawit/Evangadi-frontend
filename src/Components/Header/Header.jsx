import React, { useState } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import classes from "./Header.module.css"; // Import the CSS file for styling
import logo from "../../assets/image/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = ({ user, loading }) => {
  const [menuOpen, setMenuOpen] = useState(false); // Track dropdown menu visibility
  const location = useLocation(); // Get the current route
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token from storage
    alert("user logged out successfully!")
    window.location.href = "/auth"; // Redirect to authentication page
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev); // Toggle menu visibility
  };

  // if (loading) {
  //   return <h1>Loading...</h1>; // Show loading screen while checking user
  // }

  return (
    <header className={classes.header}>
      <div className={classes.header__logo}>
        <img
          src={logo}
          alt="Evangadi Logo"
          className={classes.header__logoimg}
        />
      </div>
      <div className={classes.link_wapper}>
        {location.pathname === "/questionpage" ? (
          // Show hamburger menu on QuestionPage
          <div className={classes.header__hamburger}>
            <RxHamburgerMenu
              onMouseEnter={toggleMenu}
              className={classes.header__hamburgerIcon}
            />
            

            {menuOpen && (
              <div className={classes.dropdown}>
                <Link to="/home" className={classes.dropdown__link}>
                  Home
                </Link>
                {user && (
                  <button
                    className={classes.dropdown__button}
                    onClick={handleLogout}
                  >
                    LOG OUT
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          // Default navigation for other pages
          
          <nav className={classes.header__nav}>
            <Link to="/home" className={classes.header__link}>
              Home
            </Link>
            <Link to="/how-it-works" className={classes.header__link}>
              How it works
            </Link>
          </nav>
        )}

        {location.pathname !== "/questionpage" && (
          <div className={classes.header__auth}>
            {user ? ( // Check if user exists
              <button
                className={classes.header__button_Logout}
                onClick={handleLogout}
              >
                LOG OUT
              </button>
            ) : (
              <Link to="/auth">
                <button className={classes.header__button}>SIGN IN</button>
              </Link>
            )}
          </div>
        )} 
      </div>
    </header>
  );
};

export default Header;
