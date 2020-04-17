import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

//Reducers
import userReducer from './reducers/userReducer'
import productReducer from './reducers/productReducer'
import uiReducer from './reducers/uiReducer'
import cartReducer from './reducers/cartReducer'
import checkoutReducer from './reducers/checkoutReducer'





const initalState = {}

const middleware = [thunk]


const reducers = combineReducers({
    user: userReducer,
    products: productReducer,
    ui: uiReducer,
    cart: cartReducer,
    checkout: checkoutReducer
})

const store = createStore(
    reducers,
    initalState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ))


export default store