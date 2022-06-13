import { applyMiddleware, combineReducers, createStore } from "redux"
import productListReducer, { productReducer } from './reducers/productReducers';
import userLoginReducer, { userProfileReducer, userRegisterReducer } from './reducers/userReducers';

import cartReducer from './reducers/cartReducers';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk"

const reducer = combineReducers({
    productList: productListReducer,
    product: productReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userProfileReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shppingAddressFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : null

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) :
    []

const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shppingAddressFromStorage ?? {} },
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