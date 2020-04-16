import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

//Reducers
import userReducer from './reducers/userReducer'
import productReducer from './reducers/productReducer'
import uiReducer from './reducers/uiReducer'
import cartReducer from './reducers/cartReducer'




const initalState = {}

const middleware = [thunk]


const reducers = combineReducers({
    user: userReducer,
    products: productReducer,
    ui: uiReducer,
    cart: cartReducer
})

const store = createStore(
    reducers,
    initalState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ))


export default store