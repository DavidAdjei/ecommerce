import axios from "axios";
import { ADD_TO_CART, DECREMENT, EMPTY_CART, INCREMENT, REMOVE_FROM_CART } from "../constants";

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

export const emptyCart = () => ({
    type: EMPTY_CART
})

export const placeOrder = (userId, order) => {
    return async () => {
        try {
           const response = await axios.post(`${process.env.REACT_APP_SERVER}/order/${userId}`, {order});
            if (!response.data.error) {
                return Promise.resolve(response.data)
            } else {
                return Promise.reject(response.data.error)
            } 
        } catch (err) {
            console.log(err);
            return Promise.reject(err.response?.data.error || err.message);
        }
        
    }
}

export const verifyPayment = (reference) => {
    return async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_SERVER}/order/verify?reference=${reference}`);
            if (!response.data.error) {
                return Promise.resolve(response.data)
            } else {
                return Promise.reject(response.data.error)
            }
        } catch (err) {
            return Promise.reject(err.response?.data.error || err.message);
        }
    }
}