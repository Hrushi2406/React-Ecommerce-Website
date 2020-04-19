import { FETCH_PRODUCTS, CLEAR_ORDER_PLACED_MESSAGE, ORDER_PLACED_SUCCESSFULLY, ADD_PRODUCTS_TO_USER, LOADING_CHECKOUT, STOP_LOADING_CHEKOUT } from "../types";

const initialState = {
    orderPlacedMessage: '',
    products: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                orderPlacedMessage: ""
            }
        case ORDER_PLACED_SUCCESSFULLY:
            console.log(action.payload)
            return {
                ...state,
                orderPlacedMessage: action.payload
            }

        case CLEAR_ORDER_PLACED_MESSAGE:
            return {
                ...state,
                orderPlacedMessage: ""
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