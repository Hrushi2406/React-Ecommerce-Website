import { FETCH_PRODUCTS, ADD_PRODUCTS_TO_USER, LOADING_CHECKOUT, STOP_LOADING_CHEKOUT } from "../types";

const initialState = {
    loading: false,
    products: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case LOADING_CHECKOUT:
            return {
                ...state,
                loading: true
            }
        case STOP_LOADING_CHEKOUT:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
} 