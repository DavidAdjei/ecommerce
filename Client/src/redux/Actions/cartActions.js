import { ADD_TO_CART, DECREMENT, INCREMENT, REMOVE_FROM_CART } from "../constants";

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product
});

export const increment = (itemId) => ({
    type: INCREMENT,
    payload: itemId
})

export const decrement = (itemId) => ({
    type: DECREMENT,
    payload: itemId
})

export const removeFromCart = (itemId) => ({
    type: REMOVE_FROM_CART,
    payload: itemId
})