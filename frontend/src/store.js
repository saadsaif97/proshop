import { applyMiddleware, combineReducers, createStore } from "redux"
import productListReducer, { productReducer } from './reducers/productReducers';

import cartReducer from './reducers/cartReducers';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk"
import userLoginReducer from './reducers/userReducers';

const reducer = combineReducers({
    productList: productListReducer,
    product: productReducer,
    cart: cartReducer,
    userLogin: userLoginReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) :
    []

const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
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