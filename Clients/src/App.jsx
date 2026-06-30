import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Logout from "./Pages/Logout/Logout";
import Register from "./Pages/Registeration/Register";
import Dashboard from "./Pages/Home/Dashboard";
import Header from "./Pages/Header/Header";
import Footer from "./Pages/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "./axios/axiosConfig";
import { AppState } from "./AppStateCtx";
import AskQuestion from "./Pages/AskQuestion/AskQuestion";
import AnswerQuestion from "./Pages/AnswerQuestion/AnswerQuestion";
import HowItWorks from "./Pages/How_it_Work/HowItWorks";

function App() {
  const [user, setUser] = useState({});
    const [islogin ,setLogin]=useState(false)
  
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function checkuser() {
    // e.preventDefault()
    try {
      const { data } = await axios.get("users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return data;
      // console.log(data)
      // setUser(data);
      // navigate("/");
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }

  useEffect(() => {
    const chekedUser = async () => {
      const data = await checkuser();
      if (data) {
        setUser(data);
      }
    };
    chekedUser();
  }, []);

  return (
    <AppState.Provider value={{ user, setUser, islogin , setLogin }}>
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/answer/:questionId" element={<AnswerQuestion />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/logout" element={<Logout />} />

        

      </Routes>
    </AppState.Provider>
  );
}

export default App;
