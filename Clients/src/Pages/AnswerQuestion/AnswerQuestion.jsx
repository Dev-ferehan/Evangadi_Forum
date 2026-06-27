import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import classes from "./answer.module.css";
import axiosConfig from "../../axios/axiosConfig";
import { MdAccountCircle, MdArrowForward } from "react-icons/md";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useEffect } from "react";
import { useState } from "react";
const AnswerQuestion = () => {
  const { questionId } = useParams();
  const [answers, setAnswer] = useState([]);
  const [question,setQuestion]=useState({});
  const [error,setError]=useState("");
  const [sucess,setSucess]=useState()
  const answerDesc = useRef();
  // const { setLogin } = useContext(AppState);

  async function QuestionAnswer() {
const token = localStorage.getItem("token");

    // e.preventDefault();
    try{
      const datas = await axiosConfig.get(`/questions/${questionId}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      // console.log(datas?.data?.singlequestion[0].title)
      return datas?.data?.singlequestion;
    }catch(error){
setError(error?.response?.data?.msg)
// console.log(error?.response?.data?.msg)
    }
   
  }

  useEffect(() => {

    const QuestionAnswerData = async () => {
      const data = await QuestionAnswer();
      if (data) {
        setAnswer(data);
        setQuestion(data[0])
      }
    };
    QuestionAnswerData();
  }, []);

  async function submithandler() {
    // e.preventDefault();

const token = localStorage.getItem("token");

    const answerDescValue = answerDesc.current.value;
    if (!answerDescValue) {
      setError("please enter your answer!")
      setSucess("")
      return;
    }
    try {
      await axiosConfig.post(
        `/answer/${questionId}/post`,
        {
          answer: answerDescValue,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        },
      );
      const updatedData = await QuestionAnswer(); 
  if (updatedData) setAnswer(updatedData);
      setSucess("Answer posted successfully")
      setError("")
      // alert("seccessfully send");
      answerDesc.current.value = "";
    } 
    catch (error) {
      // console.log(error?.response?.data?.msg);
      setError(error?.response?.data?.msg)

    }
  }
  
//  const  userName=req.user.userName;

  // console.log(question.title);
  return (
    <div className={classes.container}>
      <section className={classes.headerSection}>
        <h2 className={classes.sectionLabel}>Question</h2>
        <div className={classes.questionTitle}>
        <a href={'/'}>
        <IoArrowBackCircleSharp  className={classes.questionIcon} />
        </a>
          {question?.title}
        </div>
        <p className={classes.questionDescription}>
        
          {question?.description}
        </p>
      </section>

      {/* Answers List */}
      <h2 className={classes.communityHeader}>Answer From The Community</h2>
        {answers?.map((answer,i) => {
          return (
      <div key={i} className={classes.answerList}>

            <div className={classes.answerItem}>
              <div className={classes.userInfo}>
                <div className={classes.avatarCircle}>
                  <MdAccountCircle className={classes.avatarIcon} />
                </div>
                <span className={classes.userName}>{answer?.answer_owner}</span>
              </div>
              <div className={classes.answerText}> {answer?.answer} </div>
            </div>
                </div>
          );
        })}
     
      
  

  
      <section className={classes.postAnswerSection}>
        <div className={classes.successMessage} style={{color:'red'}} >{error}</div>
        <div className={classes.successMessage}>{sucess}</div>

        <form onSubmit={submithandler}>
          <textarea
            className={classes.answerInput}
            placeholder="Your answer ..."
            ref={answerDesc}
          ></textarea>
          <button type="submit" className={classes.postButton}>
            Post Answer
          </button>
        </form>
      </section>
    </div>
  );
};

export default AnswerQuestion;
