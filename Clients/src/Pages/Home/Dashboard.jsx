import React, { useContext } from "react";
import { AppState } from "../../AppStateCtx";
import classes from "./dashboard.module.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosConfig from "../../axios/axiosConfig";
import Layout from "../../Layout/Layout";

async function getQuestions() {
const token = localStorage.getItem("token");

  try {
    const questions = await axiosConfig.get("/questions/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return questions.data;
    // console.log(questions)
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
  }
function Dashboard() {
  
  const [question, setQuestion] = useState([]);
  const { user,setLogin } = useContext(AppState);
setLogin(true)
  useEffect(() => {
    const getQuestion = async () => {
      const data = await getQuestions();

      if (data) {
        setQuestion(data?.questions);
        // console.log("Fetched Data:", data);
      }
    };
    getQuestion();
  }, []);
  return (
    <Layout>  
    <div className={classes.dashboardContainer}>
      <div className={classes.topSection}>
        <Link to={'/ask'} className={classes.askButton}>Ask Question</Link >
        <div className={classes.welcomeText}>
          Welcome: <span className={classes.username}>{user.userName}</span>
        </div>
      </div>
      <hr className={classes.divider} />
      <div className={classes.questionList}>
        {question?.map((q) => { 
return  <Link to={`/answer/${q.questionId}`} key={q.userId} className={classes.questionItem}>
              <div className={classes.userAvatar}>
                <div className={classes.avatarCircle}>
                  <CgProfile size={800}/>
                </div>
                <span className={classes.userId}>{q.userName}</span>
              </div>
              <div className={classes.questionContent}>{q.title}</div>
              <div className={classes.arrowIcon}>
                <MdKeyboardArrowRight size={60} />
              </div>
            </Link>        
      })}
      </div>
    </div>
    </Layout>
  );
}

export default Dashboard;
