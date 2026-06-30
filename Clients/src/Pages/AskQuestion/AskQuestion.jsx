import React, {  useRef, useState } from "react";
import classes from "./askquestion.module.css";
import { Link, useNavigate } from "react-router-dom";
import axiosConfig from "../../axios/axiosConfig";
import Layout from "../../Layout/Layout";
import { AppState } from "../../AppStateCtx";
const token = localStorage.getItem("token");
const AskQuestion = () => {
  const [error, setError] = useState();
  // const [islogin,setLogin]=useContext(AppState)
  // setLogin(true)
  const titleDom = useRef();
  const descDom = useRef();
  const navigate = useNavigate();
  async function submithandler(e) {
    e.preventDefault();
    const titleValue = titleDom.current.value;
    const descValue = descDom.current.value;
    try {
      await axiosConfig.post(
        "/questions/postquestion",
        {
          title: titleValue,
          description: descValue,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      alert("seccessfully send");
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.msg);

    }
  }

  const steps = [
    "Summarize your problems in a one-line-title.",
    "Describe your problem in more detail.",
    "Describe what you tried and what you expected to happen.",
    "Review your question and post it here.",
  ];

  return (
    <Layout>  
    <div className={classes.container}>    
      <div className={classes.guide}>
        <h2 className={classes.guideTitle}>Steps To Write A Good Question.</h2>
        <ul className={classes.stepsList}>
          {steps.map((step, index) => (
            <li key={index} className={classes.stepItem}>
              <span className={classes.stepIcon}>➔</span> {step}
            </li>
          ))}
        </ul>
      </div>

      <div className={classes.postSection}>
        <h2 className={classes.postTitle}>Post Your Question</h2>
        <p style={{ color: "red" }}>{error}</p>
        <form className={classes.questionForm} onSubmit={submithandler}>
          <input
            type="text"
            className={classes.inputTitle}
            placeholder="Question title"
            ref={titleDom}
          />
          <textarea
            className={classes.inputDetail}
            placeholder="Question detail ..."
            rows="6"
            ref={descDom}
          />
          <button
            type="submit"
            className={classes.postButton}
            onSubmit={submithandler}
          >
            Post Question
          </button>
        </form>
      </div>
    </div>
    </Layout>
  );
};

export default AskQuestion;
