import { SET_USER, SET_AUTHENTICATED, SET_OVERVIEW_PRODUCT, SET_UNAUTHENTICATED, CLEAR_ARRAY, CLEAR_ERRORS, SET_ERRORS, LOADING_UI, SET_PRODUCT_HOME, SET_CATEGORY_PRODUCT } from "../types";
import api from "./apiCreate";
import Axios from "axios";
import { getIds } from './cartAction'

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: LOADING_UI })
        let response = await api.get('/')
        dispatch({ type: CLEAR_ERRORS })
        dispatch({
            type: SET_PRODUCT_HOME,
            payload: response.data.productData
        })
    } catch (err) {
        console.log(err.response.data)
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    }
}

export const clearArray = () => (dispatch) => {
    dispatch({ type: CLEAR_ARRAY })
}

export const viewAll = (key, page, sortBy = "", sortOrder = "", category1 = "", category3 = "") => async (dispatch) => {
    try {
        let response = await api.get('/products/' + key,
            {
                params: {
                    page: page,
                    sortBy: sortBy,
                    sortOrder: sortOrder,
                    category1: category1,
                    category3: category3
                }
            })
        dispatch({
            type: SET_CATEGORY_PRODUCT,
            payload: response.data
        })
        console.log("data", response.data.categoryData)
    } catch (err) {
        console.log(err.response.data)
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    }
}

export const fetchProduct = id => async (dispatch) => {
    try {
        dispatch({ type: LOADING_UI })
        let response = await api.get('/fetchProducts', { params: { productId: id } })

        dispatch({ type: CLEAR_ERRORS })
        dispatch({
            type: SET_OVERVIEW_PRODUCT,
            payload: response.data
        })

    } catch (err) {
        console.log(err)
        dispatch({
            type: SET_ERRORS,
            payload: err
        })
    }
}