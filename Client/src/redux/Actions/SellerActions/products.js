import axios from "axios";
import { SET_SELLER_PRODUCTS } from "../../constants";

export const setSellerProducts = (products) => ({
    type: SET_SELLER_PRODUCTS,
    payload: products
})

export const getSellerProducts = (sellerId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/seller/${sellerId}`);
            if (!response.data.error) {
                dispatch(setSellerProducts(response.data.products));
                return Promise.resolve(response.data)
            } else {
                dispatch(setSellerProducts([]));
                return Promise.reject(response.data.error)
            }
        } catch (err) {
            dispatch(setSellerProducts([]));
            return Promise.reject(err.response?.data.error || err.message);
        }
    }
}