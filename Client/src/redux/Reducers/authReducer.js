import { SET_AUTH, SET_NOTIFICATIONS, SET_ORDERS, SET_USER, SET_WISHLIST } from "../constants";

const initialState = {
    user: null,
    isAuth: false,
    orders: [],
    wishList: [],
    notifications: [],
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_AUTH:
            return {
                ...state,
                isAuth: action.payload
            }
        case SET_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        case SET_WISHLIST: 
            return {
                ...state,
                wishList: action.payload
            }
        case SET_NOTIFICATIONS:
            return{
                ...state,
                notifications: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;