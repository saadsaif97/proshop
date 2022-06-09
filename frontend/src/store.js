import { applyMiddleware, combineReducers, createStore } from "redux"
import productListReducer, { productReducer } from './reducers/productReducers';

import cartReducer from './reducers/cartReducers';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk"

const reducer = combineReducers({
    productList: productListReducer,
    product: productReducer,
    cart: cartReducer
})

const localStorageCartItems = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) :
    []

const initialState = {
    cart: {
        cartItems: localStorageCartItems
    }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(
            ...middleware
        ))
)

export default store