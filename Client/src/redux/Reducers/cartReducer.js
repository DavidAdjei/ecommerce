import { ADD_TO_CART, DECREMENT, INCREMENT, REMOVE_FROM_CART } from "../constants";

const initialStae = {
    cart: {}
}

const cartReducer = (state = initialStae, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    [action.payload._id]: {
                        ...(state.cart[action.payload._id] || {}),
                        quantity: (state.cart[action.payload._id]?.quantity || 0) + 1,
                        product: action.payload
                    }
                }
            };
        case INCREMENT:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    [action.payload]: {
                        ...state.cart[action.payload],
                        quantity: (state.cart[action.payload].quantity) + 1
                    }
                }
            }
        case DECREMENT:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    [action.payload]: {
                        ...state.cart[action.payload],
                        quantity: state.cart[action.payload].quantity - 1
                    }
                }
            }
        case REMOVE_FROM_CART:
            const {[action.payload]: _, ...remainingItems } = state.cart;
            return {
                ...state,
                cart: remainingItems
            }
        default:
            return state;
    }
}

export default cartReducer;