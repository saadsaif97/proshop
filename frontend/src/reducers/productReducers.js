import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from './../constants/productConstants';

export default function productListReducer(state = { products: [] }, { type, payload }) {
    switch (type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: payload }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: payload }
        default:
            return state
    }
}

export function productReducer(state = { product: { reviews: [] } }, { type, payload }) {
    switch (type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: payload }
        default:
            return state
    }
}
