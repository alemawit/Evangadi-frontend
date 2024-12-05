// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import classes from './header.module.css'; // Import the CSS file for styling
import logo from '../../assets/image/logo.png'

const Header = () => {
  const isLoggedIn = false; // Change this based on authentication logic

  return (
    <header className={classes.header}>
      <div className={classes.header__logo}>
        <img src={logo} alt="Evangadi Logo" className={classes.header__logoimg} />
      </div>
      <nav className={classes.header__nav}>
        <Link to="/" className={classes.header__link}>Home</Link>
        <Link to="/how-it-works" className={classes.header__link}>How it works</Link>
      </nav>
      <div className={classes.header__auth}>
        {isLoggedIn ? (
          <button className={classes.header__button} onClick={() => console.log('LogOut')}>
            LOGOUT
          </button>
        ) : (
          <Link to="/login">
            <button className={classes.header__button}>SIGN IN</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
