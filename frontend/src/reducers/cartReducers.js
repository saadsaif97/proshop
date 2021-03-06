import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from './../constants/cartConstants';

export default function cartReducer(state = { cartItems: [], shippingAddress: {} }, { type, payload }) {
    switch (type) {
        case CART_ADD_ITEM:
            const existingItem = state.cartItems.find(x => x.product === payload.product)
            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existingItem.product ? payload : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, payload]
                }
            }
        case CART_REMOVE_ITEM:
            return { cartItems: state.cartItems.filter(x => x.product !== payload) }
        case CART_SAVE_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: payload }
        default:
            return state
    }
}
