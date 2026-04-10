import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./login.module.css";
import Layout from "../../Layout/layout";
import axios from "../../axios/axiosConfig";
const Login = () => {
  const [err,setErr]=useState()
  const emailDom = useRef();
  const passwordDom = useRef();
  const navigate = useNavigate();

const [showPassword, setShowPassword] = useState(false);
const [type,setType]=useState('password')
  // This handles the logic safely
  const toggleVisibility = () => {
    setType( showPassword ? 'text': 'password')
    setShowPassword(!showPassword);
  };
  async function handlesubmit(e) {
    e.preventDefault()
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if (!emailValue || !passwordValue) {
      alert("please provied all fields");
    } 
    try {
      const {data}=await axios.post("/users/login", {
        "email": emailValue,
        "PASSWORD": passwordValue
      });
      localStorage.setItem("token",data.token)
      alert("seccessfully login");
      navigate("/");
    } catch (error) {
      setErr(error?.response?.data?.msg)
      console.log(error);
    }
  }
  return (
    <Layout>
      <div className={classes.container}>
        {/* Left Side: Form */}
        <div className={classes.formSection}>
          <div className={classes.formWrapper}>
            <h1 className={classes.title}>Login</h1>
            <p style={{color:'red', paddingLeft:'50px'}}> { err } </p>

            <form className={classes.form} onSubmit={handlesubmit}>
              <div className={classes.inputGroup}>
                <label>Email</label>
                <input type="email" ref={emailDom} />
              </div>

              <div className={classes.inputGroup}>
                <label>Password</label>
                <div className={classes.passwordWrapper}>
                  <input type={type} ref={passwordDom} />
                  <span className={classes.eyeIcon} onClick={toggleVisibility} >{showPassword ? '🙈' : '👁️'}</span>
                </div>
                <a href="#" className={classes.forgotPassword}>
                  Forgot Password?
                </a>
              </div>

              <button type="submit" className={classes.loginBtn}>
                Login
              </button>
            </form>

            <p className={classes.footerText}>
              Don’t have an account? <Link to={'/register'}>Sign Up</Link>
            </p>
          </div>        
        </div>
        {/* Right Side: Hero Branding */}
        <div className={classes.heroSection}>
          <div className={classes.overlay}>
            <div className={classes.heroContent}>
              <div className={classes.sparkle}>✨</div>
              <h2 className={classes.heroTitle}>
                <span className={classes.highlight}>5 Stage</span> Unique
                Learning Method
              </h2>
              <div className={classes.socialProof}>
                <div className={classes.avatarGroup}>
                  <div
                    className={classes.avatar}
                    style={{ backgroundColor: "#ccc" }}
                  ></div>
                  <div
                    className={classes.avatar}
                    style={{ backgroundColor: "#bbb" }}
                  ></div>
                  <div
                    className={classes.avatar}
                    style={{ backgroundColor: "#aaa" }}
                  ></div>
                </div>
                <span>Join 40,000+ users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
