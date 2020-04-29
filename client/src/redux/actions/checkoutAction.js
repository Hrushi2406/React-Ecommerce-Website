import api from "./apiCreate";
import { STOP_LOADING_CHEKOUT, CLEAR_ORDER_PLACED_MESSAGE, ORDER_PLACED_SUCCESSFULLY, CLEAR_ERRORS, LOADING_UI, SET_ERRORS, FETCH_PRODUCTS, LOADING_CHECKOUT, SET_SUCCESS_MESSAGE } from "../types";
import { getUser } from "./userAction";


const getIds = () => JSON.parse(localStorage.getItem('arrOfCartItems'))
const setIds = arr => localStorage.setItem('arrOfCartItems', JSON.stringify(arr))

export const mapProductsToUser = (history, product = []) => async (dispatch, getState) => {
    let arr = getIds()
    if (product.length !== 0) {
        arr = product
    }
    try {
        dispatch({ type: LOADING_UI })
        let response = await api.post('/mapProductsToUser', { cartItems: arr })
        dispatch({ type: CLEAR_ERRORS })
        dispatch({ type: CLEAR_ORDER_PLACED_MESSAGE })
        history.push('/checkout')
    } catch (err) {
        console.log(err)
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data.general
        })
        setTimeout(() => {
            if (!getState().user.authenticated) {
                history.push('/login')
            }
        }, 1500)


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
            payload: err.response.data.general
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

export const payWithRazorpay = () => async dispatch => {
    try {
        dispatch({ type: LOADING_UI })
        let response = await api.post('/payWithRazorpay')
        dispatch({ type: CLEAR_ERRORS })
        let order = response.data.order
        let userData = response.data.userData
        const responseHandler = (res) => {
            dispatch(placeOrder('razorpay', res))
        }

        const options = {
            key: order.key,
            order_id: order.id,
            currency: order.currency,
            amount: order.amount,
            name: userData.name,
            description: "Payment for Just Tanned Purchase",
            handler: responseHandler,
            prefill: {
                name: userData.name,
                email: userData.email,
                contact: userData.mobile,
            },
            notes: {
                address: "Just Tanned VJTI Mumbai"
            },
            theme: {
                color: "#404969"
            }
        };
        let rzp = new window.Razorpay(options)
        rzp.open()
    } catch (err) {
        console.log(err)
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data.general
        })
    }
}

export const placeOrder = (paymentMethod, paymentDetails = {}) => async dispatch => {
    try {
        dispatch({ type: LOADING_UI })
        let response = await api.post('/placeOrder', { paymentMethod, paymentDetails })
        dispatch({ type: CLEAR_ERRORS })
        dispatch({
            type: ORDER_PLACED_SUCCESSFULLY,
            payload: response.data.success
        })
    } catch (err) {
        console.log(err.response.data)
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data.general
        })
    }
}
