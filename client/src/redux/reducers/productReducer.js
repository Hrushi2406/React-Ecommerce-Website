import { SET_PRODUCT_HOME, SET_CATEGORY_PRODUCT, CLEAR_ARRAY } from "../types";

const initalState = {
    productsData: {},
    viewCategoryData: {
        categoryData: [],
        paginateInfo: {
            hasMore: true
        }
    }
}

export default function (state = initalState, action) {
    switch (action.type) {
        case SET_PRODUCT_HOME:
            return {
                ...state,
                productsData: action.payload
            }
        case SET_CATEGORY_PRODUCT:
            let data = state.viewCategoryData.categoryData
            return {
                ...state,
                viewCategoryData: {
                    categoryData: [...data, ...action.payload.categoryData],
                    paginateInfo: { ...action.payload.paginateInfo }
                }
            }
        case CLEAR_ARRAY:
            return {
                ...state,
                viewCategoryData: initalState.viewCategoryData
            }

        default:
            return state
    }
} 