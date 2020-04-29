import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, CLEAR_ERRORS, SET_ERRORS, LOADING_UI } from "../types";

const initalState = {
    authenticated: false,
    userData: {},
}

export default function (state = initalState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED:
            return initalState
        case SET_USER:
            return {
                authenticated: true,
                userData: action.payload
            }

        default:
            return state
    }
} 