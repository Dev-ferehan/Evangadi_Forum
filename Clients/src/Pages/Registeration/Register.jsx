import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./register.module.css";
import axios from "../../axios/axiosConfig";
import sidebarImage from "../../assets/10001.png";
import Layout from "../../Layout/Layout";

function Register() {
  const [err, seterr] = useState();
  const navigate = useNavigate();
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [type, setType] = useState("password");


  const toggleVisibility = () => {
    setType(showPassword ? "text" : "password");
    setShowPassword(!showPassword);
  };

  async function submitHandler(e) {
    e.preventDefault();
    const userNameValue = userNameDom.current.value;
    const firstNameValue = firstNameDom.current.value;
    const lastNameValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (
      !userNameValue ||
      !firstNameValue ||
      !lastNameValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert("please enter all provied fields");
    }

    try {
      // console.log(userNameValue);
      // console.log(firstNameValue);
      // console.log(lastNameValue);
      // console.log(emailValue);
      // console.log(passwordValue);
      await axios.post("/users/register", {
        userName: userNameValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        PASSWORD: passwordValue,
      });

      navigate("/login");
    } catch (error) {
      seterr(error?.response?.data?.msg);
    }
  }
  return (
    <Layout>
      <div className={classes.pageContainer}>
        <main className={classes.mainContent}>
          {/* Left Section: Form */}
          <section className={classes.formSection}>
            <div className={classes.formWrapper}>
              <h2>Join The Network</h2>
              <p style={{ color: "red", paddingLeft: "50px" }}> {err} </p>
              <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.inputGroup}>
                  <label>User Name</label>
                  <input
                    type="userName"
                    name="userName"
                    placeholder="Enter your User Name"
                    ref={userNameDom}
                  />
                </div>
                <div className={classes.inputGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email Address"
                    ref={emailDom}
                  />
                </div>
                <div className={classes.inputGroup}>
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter First Name"
                    ref={firstNameDom}
                  />
                </div>

                <div className={classes.inputGroup}>
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter Last Name"
                    ref={lastNameDom}
                  />
                </div>

                <div className={classes.inputGroup}>
                  <label>Password</label>
                  <div className={classes.passwordWrapper}>
                    <input
                      type={type}
                      name="password"
                      placeholder=""
                      ref={passwordDom}
                      id="password"
                    />
                    <span
                      className={classes.toggleIcon}
                      onClick={toggleVisibility}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </span>
                  </div>
                </div>

                <p className={classes.terms}>
                  I agree to the <a href="/privacy">privacy policy</a> and{" "}
                  <a href="/terms">terms of service.</a>
                </p>

                <button type="submit" className={classes.joinButton}>
                  Agree and Join
                </button>
                <p className={classes.terms} style={{ fontSize: 20 }}>
                  Already have an account? <Link to={"/login"}>Log in</Link>
                </p>
              </form>
            </div>
          </section>

          {/* Right Section */}
          <section
            className={classes.infoSection}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${sidebarImage})`,
            }}
          >
            <div className={classes.infoContent}>
              <span className={classes.sparkle}>✦</span>
              <h1>
                Access To Top{" "}
                <span className={classes.highlight}>
                  Courses And Job Training
                </span>
              </h1>
              <p>
                Whether you are willing to share your knowledge or you are just
                looking to meet mentors of your own, please start by joining the
                network here.
              </p>
              <div className={classes.footerInfo}>
                <div className={classes.avatarGroup}>
                
                  <div className={classes.avatar}></div>
                  <div className={classes.avatar}></div>
                  <div className={classes.avatar}></div>
                </div>
                <span>Join 40,000+ users</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}

export default Register;
