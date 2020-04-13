import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

//Reducers
import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'
import uiReducer from './reducers/uiReducer'



const initalState = {}

const middleware = [thunk]


const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
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