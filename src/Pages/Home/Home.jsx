import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppState } from "../../App";
// import axios from "../../Axios/Axios"; // Import axios instance
import classes from "./Home.module.css"; // Import CSS module for styles
// import AuthUser from '../Components/AuthUser/AuthUser'
import AllQuestions from "../AllQuestions/AllQuestions";

const Home = () => {
  const { user } = useContext(AppState); // Access the logged-in user from context
  const { questionid } = useParams(); // Extract the questionid from the URL
  const [question, setQuestion] = useState(null); // State to store a single question
  const [loading, setLoading] = useState(true); // State to indicate loading status
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  

  // Handle changes in the search bar (for all questions)
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query
  };

  return (
    <div className={classes.home}>
      {/* <AuthUser user={user} /> */}
      {/* Header Section */}
      <header className={classes.header}>
        {/* Ask Question Button (only visible if logged in) */}
        <Link to={"/questionpage"}>
          <div className={classes.askQuestion}>
            {user ? (
              <button>Ask Question</button>
            ) : (
              <p>Please log in to ask a question.</p>
            )}
          </div>
        </Link>

        <div className={classes.welcomeMessage}>
          {/* Dynamically render the logged-in user's name */}
          Welcome: <span>{user?.username || "Guest"}</span>
        </div>
      </header>

      {/* Main Content Section */}
      <main className={classes.mainContent}>
        {/* Search Bar */}
        <div className={classes.searchBar}>
          <input
            type="text"
            placeholder="Search questions"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Question Display (if questionid is available) */}
        <AllQuestions />
      </main>
    </div>
  );
};

export default Home;