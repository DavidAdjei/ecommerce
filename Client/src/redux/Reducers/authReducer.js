import { SET_AUTH, SET_USER } from "../constants";

const initialState = {
    user: null,
    isAuth: false
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
        default:
            return state;
    }
}

export default authReducer;