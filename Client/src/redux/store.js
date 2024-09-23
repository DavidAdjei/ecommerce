import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; 
import { combineReducers } from 'redux';
import productReducer from './Reducers/productReducer';

const rootReducer = combineReducers({
  product: productReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
