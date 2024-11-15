const { SET_PRODUCTS, SET_FEATURED_PRODUCT, SET_SELECTED_PRODUCT, SET_CATEGORIES, SET_FILTERED_PRODUCTS, SET_FEEDBACK} = require("../../constants");

const initialState = {
    products: [],
    featuredProducts: [],
    selectedProduct: null,
    categories: [],
    filteredProducts: [],
    feedback: null
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
            };
        case SET_FILTERED_PRODUCTS:
            return {
                ...state,
                filteredProducts: action.payload
            }
        case SET_SELECTED_PRODUCT:
            return {
                ...state,
                selectedProduct: action.payload
            }
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case SET_FEEDBACK:
            return {
                ...state,
                feedback: action.payload
            }
        default:
            return state;
    }  
};

export default productReducer;