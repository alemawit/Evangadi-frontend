import React from "react";
import { Link } from "react-router-dom";
import classes from "./About.module.css"; // Use the same CSS file for styling

const About = () => {
  return (
    <section className={classes.aboutContainer}>
      <div className={classes.aboutBox}>
        <p className={classes.title_abt}>About</p>
        <h1 className={classes.subtitle}>Evangadi Networks</h1>
        <p className={classes.description}>
          No matter what stage of life you are in, whether you’re just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your
          footsteps.
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
  );
};

export default About;
