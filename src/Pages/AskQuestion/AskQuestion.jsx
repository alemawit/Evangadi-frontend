import axios from "../../Axios/Axios";
import { AppState } from "../../App";
import { createContext, useContext } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AskQuestion.module.css"; // Import CSS Module
import { IoArrowForwardCircleSharp } from "react-icons/io5";


function AskQuestion() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const navigate = useNavigate();
  const { user } = useContext(AppState);

  async function handleSubmit(e) {
    e.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const token = localStorage.getItem("token");

    if (!title || !description) {
      return alert("Please provide all required fields");
    }

    try {
      await axios.post(
        "api/questions",
        {
          title: title,
          description: description
        //   tag:"general"

        //   userid: user.userId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      titleRef.current.value = "";
      descriptionRef.current.value = "";
      alert("Question posted successfully");
      navigate("/home");
    } catch (error) {
      console.error(error.response.data);
      alert("Error posting question");
    }
  }

  return (
    <section className={classes.container}>
      <div className={classes.guidelines}>
        <h3 className={classes.steps_title}>
          <h3 className={classes.steps_title_first}>Steps To Write</h3>
          <span className={classes.highlight}> A Good Question</span>
        </h3>
        <div>
          <p>
            <span className={classes.highlight}>
              <IoArrowForwardCircleSharp />
            </span>
            Summarize your problem in one-line title.
          </p>
          <p>
            <span className={classes.highlight}>
              <IoArrowForwardCircleSharp />
            </span>
            Describe your problem in more detail.
          </p>
          <p>
            <span className={classes.highlight}>
              <IoArrowForwardCircleSharp />
            </span>
            Describe what you tried and you expect to happen.
          </p>
          <p>
            <span className={classes.highlight}>
              <IoArrowForwardCircleSharp />
            </span>
            Review your question and post it to the site.
          </p>
        </div>
      </div>
      <div className={classes.post_question_title}>
        <h2>Post Your Question</h2>
      </div>

      <form method="post" onSubmit={handleSubmit} className={classes.form}>
        <div>
          <div>
            <input
              className={classes.inputField}
              ref={titleRef}
              type="text"
              id="title"
              placeholder="Question title"
            />
          </div>
        </div>

        <div>
          <div>
            <textarea
              ref={descriptionRef}
              rows="10"
              className={classes.textareaField}
              id="description"
              placeholder="question detail ..."
            ></textarea>
          </div>
        </div>
        <div>
          <button className={classes.submitBtn} type="submit">
            Post Question
          </button>
        </div>
      </form>
    </section>
  );
}

export default AskQuestion;
