import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import expireReducer from 'redux-persist-transform-expire';
import { thunk } from 'redux-thunk';
import { combineReducers } from 'redux';
import productReducer from './Reducers/productReducer';
import cartReducer from './Reducers/cartReducer';

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer
});

const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    expireReducer('cart', {
      expireSeconds: 24 * 60 * 60,
      expireState: {},
      autoExpire: true
    })
  ],
  whitelist: ['cart']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);
export { store, persistor };
