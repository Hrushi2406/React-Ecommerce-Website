import { CLEAR_ERRORS, CLEAR_SUCCESS_MESSAGE, RESET_UI } from "../types";

export const clearErrors = () => dispatch => dispatch({ type: RESET_UI })

export const clearSuccessMessage = () => dispatch => dispatch({ type: RESET_UI })