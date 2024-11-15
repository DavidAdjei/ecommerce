import { SET_SELLER_PRODUCTS } from "../../constants"

const initialState = {
    products: []
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELLER_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        default:
            return state
    }
}

