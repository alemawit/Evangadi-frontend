import React, { useEffect, useState, useContext } from "react";
import axios from "../../axiosConfig";
import { AppState } from "../../App";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import classes from "./AllQuestions.module.css"; // Import the CSS Module
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

function AllQuestions() {
  const { user } = useContext(AppState);
  const token = localStorage.getItem("token");
  const [questions, setQuestions] = useState([]);

  async function fetchAllQuestions() {
    try {
      const response = await axios.get("api/questions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Assuming the response includes a 'createdAt' field that holds the timestamp
      console.log(response.data);
      const sortedQuestions = response.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setQuestions(sortedQuestions); // Set the questions in the state after sorting

        // setQuestions(response.data); // Set the questions fetched
        // console.log(response.data);
    } catch (error) {
      console.log("Error fetching questions: ", error);
    }
  }

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.questionsContainer}>
        {questions.map((element) => (
          <div key={element.questionid} className={classes.questionItem}>
            {/* Avatar Icon */}
            <div className={classes.avatarContainer}>
              <BsPersonCircle size={48} className="text-blue-600" />
              <p tabIndex="0" className={classes.username}>
                {element.username}
              </p>
            </div>

            {/* Question Info */}
            <Link to={`answerpage/${element.questionid}`} className={classes.questionInfo}>
              <div className={classes.questionInfo}>
                <p tabIndex="0" className={classes.questionTitle}>
                  {element.title}
                </p>
              </div>
            </Link>

            {/* Navigation Arrow */}
            <div>
              <Link to={`/details/${element.questionid}`}>
                <span className={classes.navigationArrow}>
                  <ArrowForwardIosRoundedIcon size={100} />
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllQuestions;
