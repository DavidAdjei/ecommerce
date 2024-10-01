import { SET_CATEGORIES, SET_FEATURED_PRODUCT, SET_PRODUCTS, SET_SELECTED_PRODUCT, SET_FILTERED_PRODUCTS, SET_FEEDBACK } from "../constants";
import axios from "axios"

export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products
})

export const setFeaturedProducts = (products) => ({
    type: SET_FEATURED_PRODUCT,
    payload: products
})

export const setFilteredProducts = (products) => ({
    type: SET_FILTERED_PRODUCTS,
    payload: products
})

export const setSelectedProduct = (product) => ({
    type: SET_SELECTED_PRODUCT,
    payload: product
})

export const setCategories = (categories) => ({
    type: SET_CATEGORIES,
    payload: categories
})

export const setFeedback = (data) => ({
    type: SET_FEEDBACK,
    payload: data
})

export const getProducts = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/products`);
            if (!response.data.error) {
                dispatch(setProducts(response.data.products));
                return Promise.resolve(response.data)
            } else {
                return Promise.reject(response.data.error)
            }
        } catch (err) {
            return Promise.reject(err.response?.data.error || err.message);
        }
    }
}

export const getSelectedProduct = (productId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/products/${productId}`);
            if (!response.data.error) {
                dispatch(setSelectedProduct(response.data.product));
                return Promise.resolve(response.data)
            } else {
                return Promise.reject(response.data.error)
            }
        } catch (err) {
            return Promise.reject(err.response?.data.error || err.message);
        }
    }
}


export const getCategories = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/categories`);
            if (!response.data.error) {
                dispatch(setCategories(response.data.categories));
                return Promise.resolve(response.data)
            } else {
                return Promise.reject(response.data.error)
            }
        } catch (err) {
            return Promise.reject(err.response?.data.error || err.message)
        }
    }
}