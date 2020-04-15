import { SET_PRODUCT_HOME, SET_CATEGORY_PRODUCT, CLEAR_ARRAY, SET_OVERVIEW_PRODUCT } from "../types";

const initalState = {
    productsData: {},
    currentOverview: {
        product_images: [],
        labels: [],
        values: [],
        category1: "",
        category2: "",
        category3: "",
    },
    viewCategoryData: {
        categoryData: [],
        paginateInfo: {
            hasMore: true,
            category1: "",
            category3: "",
            sortBy: "",
            sortOrder: 'asc',
            categories: {
                category1: [],
                category3: []
            }
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
        case SET_OVERVIEW_PRODUCT:
            return {
                ...state,
                currentOverview: action.payload.arrofProducts[0]
            }
        default:
            return state
    }
} 