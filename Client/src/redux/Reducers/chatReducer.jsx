const { SET_MESSAGES, SET_CONTACTS } = require("../constants");

const initialState = {
    messages: [],
    contacts: []
}

const chatReducer = (state= initialState, action) => {
    switch (action.type) {
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
        case SET_CONTACTS:
            return{
                ...state,
                contacts: action.payload
            }
        default:
            return state;
    }
}

export default chatReducer;