import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

//Reducers
import userReducer from './reducers/userReducer'
import productReducer from './reducers/productReducer'
import uiReducer from './reducers/uiReducer'



const initalState = {}

const middleware = [thunk]


const reducers = combineReducers({
    user: userReducer,
    products: productReducer,
    ui: uiReducer
})

const store = createStore(
    reducers,
    initalState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ))


export default store