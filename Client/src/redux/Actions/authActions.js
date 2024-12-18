import axios from "axios";
import { SET_AUTH, SET_LOADING, SET_NOTIFICATIONS, SET_ORDERS, SET_USER, SET_WISHLIST } from "../constants";

axios.defaults.withCredentials = true;

export const setUser = (user) => ({
    type: SET_USER,
    payload: user    
});

export const setAuth = (bool) => ({
    type: SET_AUTH,
    payload: bool
});

export const setOrders = (orders) => ({
    type: SET_ORDERS,
    payload: orders
})

export const setWishlist = (wishlist) => ({
    type: SET_WISHLIST,
    payload: wishlist
});

export const setNotification = (notifications) => ({
    type: SET_NOTIFICATIONS,
    payload: notifications
})

export const setLoading = (loading) => ({
    type: SET_LOADING,
    payload: loading
})

export const signUp = (step, role, credentials) => {
    return async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/auth/signUp`, {step, role, credentials});
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

export const signin = (credentials) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/auth/login`, credentials );
            if (!response.data.error) {
                dispatch(setUser(response.data.user));
                dispatch(setAuth(true));
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

export const uploadImage = (formdata, userId) => {
    return async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_SERVER}/auth/uploadImage/${userId}`, formdata, {
                headers: {
                    "Content-Type" : 'muiltipart/form-data'
                }
            });
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

export const editUser = (credentials, userId) => {
    return async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_SERVER}/auth/${userId}`, {credentials});
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

export const addAddress = (credentials, userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_SERVER}/auth/addAddress/${userId}`, credentials);
            if (!response.data.error) {
                dispatch(setUser(response.data.user));
                return Promise.resolve(response.data);
            } else {
                return Promise.reject(response.data.error);
            } 
        } catch (err) {
            return Promise.reject(err.response?.data.error || err.message);
        }
    }
}



export const checkAuth = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/auth/isAuth`);
            if (!response.data.error) {
                dispatch(setUser(response.data.user));
                dispatch(setAuth(true));
                return Promise.resolve(response.data)
            } else {
                if(response.data.error === "Registration Incomplete"){
                    dispatch(setUser(response.data.user));
                    return Promise.reject(response.data.error)
                }
                return Promise.reject(response?.data.error);
            } 
        } catch (err) {
            if(err.response.data.error === "Registration Incomplete"){
                dispatch(setUser(err.response.data.user));
                return Promise.reject(err.response.data.error)
            }
            return Promise.reject(err.response?.data.error || err.message);
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/auth/logout`);
            if (!response.data.error) {
                dispatch(setUser(null));
                dispatch(setAuth(false));
                return Promise.resolve(response?.data)
            } else {
                return Promise.reject(response?.data?.error)
            } 
        } catch (err) {
            return Promise.reject(err.response?.data.error || err.message);
        }
    }
}

export const getOrders = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/order/${userId}`);
            if (!response.data.error) {
                dispatch(setOrders(response.data.orders));
                return Promise.resolve(response.data)
            } else {
                return Promise.reject(response.data.error)
            } 
        } catch (err) {
            return Promise.reject(err.response?.data.error || err.message);
        }
    }
}

export const getWishlist = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/wishlist/${userId}`);
            if (!response.data.error) {
                dispatch(setWishlist(response.data.wishlist));
                return Promise.resolve(response.data)
            } else {
                return Promise.reject(response.data)
            } 
        } catch (err) {
            return Promise.reject(err.response?.data || { error: err.message});
        }
    }
}

export const addToWishlist = (userId, productId) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/wishlist/${userId}/${productId}`);
            if (!response.data.error) {
                dispatch(getWishlist(userId));
                return Promise.resolve(response.data)
            } else {
                return Promise.reject(response.data.error)
            } 
        } catch (err) {
            return Promise.reject(err.response?.data.error || err.message);
        }
    }
}

export const removeFromWishlist = (userId, productId) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER}/wishlist/${userId}/${productId}`);
            if (!response.data.error) {
                dispatch(getWishlist(userId));
                return Promise.resolve(response.data)
            } else {
                return Promise.reject(response.data.error)
            } 
        } catch (err) {
            return Promise.reject(err.response?.data.error || err.message);
        }
    }
}

export const getNotifications = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/auth/notifications/${userId}`);
            if (!response.data.error) {
                dispatch(setNotification(response.data.notifications));
                console.log(response.data.notifications);
                return Promise.resolve(response.data)
            } else {
                return Promise.reject(response?.data?.error)
            } 
        } catch (err) {
            return Promise.reject(err.response?.data.error || err.message);
        }
    }
}