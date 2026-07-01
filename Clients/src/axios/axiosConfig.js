import axios from 'axios'

const axiosConfig=axios.create({
    // baseURL:'http://localhost:5500/api'
    baseURL:'https://evangadi-forum-vhr9.onrender.com'
})
export default axiosConfig