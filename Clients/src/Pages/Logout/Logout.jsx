import React,{useContext} from 'react'
import { AppState } from '../../AppStateCtx'
import { useNavigate } from 'react-router-dom'
function Logout() {
    const { setUser}=useContext(AppState)
    const navigate=useNavigate()
    setUser("")
    localStorage.removeItem("token");
    // alert('Successfully logged out')
    window.location.reload();
    navigate('/login')
}

export default Logout
