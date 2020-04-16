import { ADD_TO_CART, REMOVE_FROM_CART, SET_CART_PRODUCTS, HANDLE_ITEM_COUNT } from "../types";


const initalState = {
    arrOfCartItems: [],
}


export default function (state = initalState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                arrOfCartItems: action.payload
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                arrOfCartItems: action.payload
            }
        case SET_CART_PRODUCTS:
            return {
                ...state,
                arrOfCartItems: action.payload
            }
        case HANDLE_ITEM_COUNT:
            return {
                ...state,
                arrOfCartItems: action.payload
            }
        default:
            return state
    }
}