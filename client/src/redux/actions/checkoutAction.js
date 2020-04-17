import api from "./apiCreate";
import { STOP_LOADING_CHEKOUT, CLEAR_ERRORS, LOADING_UI, SET_ERRORS, FETCH_PRODUCTS, LOADING_CHECKOUT, SET_SUCCESS_MESSAGE } from "../types";
import { getUser } from "./userAction";


const getIds = () => JSON.parse(localStorage.getItem('arrOfCartItems'))
const setIds = arr => localStorage.setItem('arrOfCartItems', JSON.stringify(arr))

export const mapProductsToUser = (history) => async dispatch => {
    let arr = getIds()
    try {
        dispatch({ type: LOADING_UI })
        let response = await api.post('/mapProductsToUser', { cartItems: arr })
        dispatch({ type: CLEAR_ERRORS })
        history.push('/checkout')
    } catch (err) {
        console.log(err)
        dispatch({ type: CLEAR_ERRORS })
    }
}

export const fetchProducts = () => async dispatch => {
    try {
        dispatch({ type: LOADING_UI })
        let response = await api.get('/checkoutProducts')
        dispatch({ type: CLEAR_ERRORS })
        dispatch({
            type: FETCH_PRODUCTS,
            payload: response.data.productsList
        })
    }
    catch (err) {
        console.log(err)
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    }
}

export const saveAddress = userAddress => async dispatch => {
    try {
        dispatch({ type: LOADING_UI })
        let response = await api.post('/addAddress', { userAddress })
        dispatch(getUser())
        dispatch({ type: CLEAR_ERRORS })
        dispatch({ type: SET_SUCCESS_MESSAGE, payload: response.data.success })


    } catch (err) {
        console.log(err)
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data.general
        })
    }
}

export const deleteAddress = index => async dispatch => {
    try {
        dispatch({ type: LOADING_UI })
        let response = await api.post('/deleteAddress', { index })
        dispatch(getUser())
        dispatch({ type: CLEAR_ERRORS })
        dispatch({ type: SET_SUCCESS_MESSAGE, payload: response.data.success })

    } catch (err) {
        console.log(err)
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data.general
        })
    }
}

export const updateDefaultAddress = defaultAddress => async dispatch => {
    try {
        dispatch({ type: LOADING_UI })
        let response = await api.post('/updateDefaultAddress', { defaultAddress })
        dispatch(getUser())
        console.log(response.data)
        dispatch({ type: CLEAR_ERRORS })
        if (response.data.success) {
            dispatch({ type: SET_SUCCESS_MESSAGE, payload: response.data.success })
        }

    } catch (err) {
        console.log(err)
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data.general
        })
    }
}