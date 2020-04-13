import axios from 'axios'

export default axios.create({
    baseURL: "https://leathapi.herokuapp.com",
    // baseURL: "http://localhost:5000"

})