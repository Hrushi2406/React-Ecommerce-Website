import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, CLEAR_ERRORS, SET_ERRORS, LOADING_UI } from "../types";

const initalState = {
    auth: false,
    credentials: {},
}

export default function (state = initalState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                auth: true
            }
        case SET_UNAUTHENTICATED:
            return initalState


        default:
            return state
    }
} 