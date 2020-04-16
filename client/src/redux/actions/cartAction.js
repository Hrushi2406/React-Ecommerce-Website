import { SET_AUTHENTICATED, INCREASE_ITEM_COUNT, DECREASE_ITEM_COUNT, SET_SUCCESS_MESSAGE, SET_OVERVIEW_PRODUCT, SET_UNAUTHENTICATED, CLEAR_ARRAY, CLEAR_ERRORS, SET_ERRORS, LOADING_UI, SET_PRODUCT_HOME, SET_CATEGORY_PRODUCT, ADD_TO_CART, REMOVE_FROM_CART, SET_CART_PRODUCTS, HANDLE_ITEM_COUNT, CLEAR_SUCCESS_MESSAGE } from "../types";
import api from "./apiCreate";


const getIds = () => JSON.parse(localStorage.getItem('arrOfCartItems'))
const setIds = arr => localStorage.setItem('arrOfCartItems', JSON.stringify(arr))

export const addToCart = product => dispatch => {
    let arrOfCartItems = getIds() === null ? [] : getIds()
    console.log(arrOfCartItems)
    let isInArr = arrOfCartItems.some(item => item.productId == product.productId)
    if (isInArr) {
        dispatch({ type: SET_ERRORS, payload: "Item already present in the bag" })
    }
    else {
        product.count = 1
        arrOfCartItems.push(product)
        setIds(arrOfCartItems)
        dispatch({ type: SET_SUCCESS_MESSAGE, payload: "Item added to bag successfully" })
        dispatch({
            type: ADD_TO_CART,
            payload: arrOfCartItems
        })
    }
    console.log(arrOfCartItems)
}

export const removeFromCart = product => dispatch => {
    let arrOfCartItems = getIds()
    let arr = arrOfCartItems.filter(item => item.productId !== product.productId)
    setIds(arr)
    dispatch({ type: SET_SUCCESS_MESSAGE, payload: 'Item removed Successfully' })
    dispatch({
        type: REMOVE_FROM_CART,
        payload: arr
    })
    console.log(arr)
}

export const fetchCartItems = () => async dispatch => {
    let arrOfCartItems = getIds()
    dispatch({ type: SET_CART_PRODUCTS, payload: arrOfCartItems })
}

export const increaseItemCount = product => async dispatch => {
    let arrOfCartItems = getIds()

    console.log(arrOfCartItems.findIndex(item => item.productId == product.productId))
    let index = arrOfCartItems.findIndex(item => item.productId == product.productId)
    arrOfCartItems[index].count = product.count + 1
    setIds(arrOfCartItems)
    dispatch({ type: HANDLE_ITEM_COUNT, payload: arrOfCartItems })
}

export const decreaseItemCount = product => async dispatch => {
    let arrOfCartItems = getIds()
    let index = arrOfCartItems.findIndex(item => item.productId == product.productId)
    if (arrOfCartItems[index].count == 1) {
        dispatch({ type: SET_ERRORS, payload: 'Quantity must be minimum 1' })
    }
    else {
        arrOfCartItems[index].count = product.count - 1
    }
    setIds(arrOfCartItems)
    dispatch({ type: HANDLE_ITEM_COUNT, payload: arrOfCartItems })
}

export const clearBag = () => dispatch => {
    let arrOfCartItems = getIds()
    let arr = []
    dispatch({ type: SET_SUCCESS_MESSAGE, payload: 'Cleared Bag Successfully' })
    setIds(arr)
    dispatch({ type: HANDLE_ITEM_COUNT, payload: arr })
}