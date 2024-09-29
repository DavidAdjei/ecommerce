import axios from "axios";
import { SET_AUTH, SET_USER } from "../constants";

export const setUser = (user) => ({
    type: SET_USER,
    payload: user    
});

export const setAuth = (bool) => ({
    type: SET_AUTH,
    payload: bool
});

export const signUp = (credentials) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/auth/signUp`, credentials);
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
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/auth/login`, credentials, {
                withCredentials: true
            });
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


export const checkAuth = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/auth/isAuth`, {}, {
                withCredentials: true
            });
            if (!response.data.error) {
                dispatch(setUser(response?.data?.user));
                dispatch(setAuth(true));
                return Promise.resolve(response?.data)
            } else {
                return Promise.reject(response?.data?.error)
            } 
        } catch (err) {
            return Promise.reject(err.response?.data.error || err.message);
        }
    }
}
