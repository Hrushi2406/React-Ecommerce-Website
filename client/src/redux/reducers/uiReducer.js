import { CLEAR_ERRORS, RESET_UI, SET_ERRORS, LOADING_UI, CLEAR_SUCCESS_MESSAGE, SET_SUCCESS_MESSAGE } from "../types";

const initialState = {
    loading: false,
    errors: null,
    success: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null,
            }
        case SET_SUCCESS_MESSAGE:
            return {
                ...state,
                loading: false,
                success: action.payload
            }
        case CLEAR_SUCCESS_MESSAGE:
            return {
                ...state,
                loading: false,
                success: null,
            }
        case RESET_UI:
            return initialState
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}
