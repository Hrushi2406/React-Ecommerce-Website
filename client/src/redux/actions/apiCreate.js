import axios from 'axios'

export default axios.create({
    // baseURL: "https://leathapi.herokuapp.com/api",
    baseURL: "http://localhost:5000/api",

})