import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, CLEAR_ERRORS, SET_ERRORS, LOADING_UI } from "../types";
import api from "./apiCreate";
import axios from "axios";

export const loginUser = (userData, history) => async (dispatch) => {
    dispatch({ type: LOADING_UI });
    try {
        let response = await api.post('/login', userData)
        let token = response.data.token
        localStorage.setItem('authToken', token)
        api.defaults.headers.common['Authorization'] = token
        dispatch({ type: CLEAR_ERRORS })
        dispatch({
            type: SET_USER,
            payload: response.data.userData
        })
        history.push('/')
    } catch (err) {
        console.log(err.response)
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    }
}


export const signUpUser = (userData, history) => async (dispatch) => {
    dispatch({ type: LOADING_UI });
    try {
        let response = await api.post('/signUp', userData)
        let token = response.data.token
        localStorage.setItem('authToken', token)
        api.defaults.headers.common['Authorization'] = token
        console.log('here')
        dispatch({ type: CLEAR_ERRORS })
        dispatch({
            type: SET_USER,
            payload: response.data.userData
        })
        history.push('/')
    } catch (err) {
        console.log(err.response)
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getUser = () => async dispatch => {
    try {
        let response = await api.get('/userDetails')
        dispatch({
            type: SET_USER,
            payload: response.data.userData
        })
        console.log(response.data.userData)
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    }
} 