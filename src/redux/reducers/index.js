import { storeProducts } from "../../data"
import { combineReducers } from "redux";

const storeReducer = () => {
    return storeProducts
}

const cartReducer = (state = [], action) => {
    if (action.type === "ADD_TO_CART") {
        return [...state, action.payload];
    }
    else if (action.type === "GET_CART_ITEMS") {
        return action.payload
    }
    return state
}

export default combineReducers({
    products: storeReducer,
    cart: cartReducer
})