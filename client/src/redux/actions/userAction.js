import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, CLEAR_ERRORS, SET_ERRORS, LOADING_UI } from "../types";
import api from "./apiCreate";
import Axios from "axios";

export const loginUser = (userData) => async (dispatch) => {
    dispatch({ type: LOADING_UI });
    try {
        let response = await api.post('/login', userData)
        let token = response.data.token
        localStorage.setItem('authToken', token)
        Axios.defaults.headers.common['Authorization'] = token
        dispatch({ type: CLEAR_ERRORS })

    } catch (err) {
        console.log(err.response)
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    }

}