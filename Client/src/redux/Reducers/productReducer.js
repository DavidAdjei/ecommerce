const { SET_PRODUCTS, SET_FEATURED_PRODUCT, SET_SELECTED_PRODUCT} = require("../constants");

const initialState = {
    products: [],
    featuredProducts: [],
    selectedProduct: null
}


const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        case SET_FEATURED_PRODUCT:
            return {
                ...state,
                featuredProducts: action.payload
            }    
        case SET_SELECTED_PRODUCT:
            return {
                ...state,
                selectedProduct: action.payload
            }
        default:
            return state;
    }  
};

export default productReducer;