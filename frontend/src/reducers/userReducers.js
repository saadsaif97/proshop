import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_PROFILE_FAIL,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS
} from './../constants/userConstants';

export default function userLoginReducer(state = { userInfo: {} }, { type, payload }) {
    switch (type) {
        case USER_LOGIN_REQUEST:
            return { ...state, loading: true }
        case USER_LOGIN_SUCCESS:
            return { ...state, loading: false, userInfo: payload }
        case USER_LOGIN_FAIL:
            return { ...state, loading: false, error: payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export function userRegisterReducer(state = { userInfo: {} }, { type, payload }) {
    switch (type) {
        case USER_REGISTER_REQUEST:
            return { ...state, loading: true }
        case USER_REGISTER_SUCCESS:
            return { ...state, loading: false, userInfo: payload }
        case USER_REGISTER_FAIL:
            return { ...state, loading: false, error: payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export function userProfileReducer(state = { user: {} }, { type, payload }) {
    switch (type) {
        case USER_PROFILE_REQUEST:
            return { ...state, loading: true }
        case USER_PROFILE_SUCCESS:
            return { ...state, loading: false, user: payload }
        case USER_PROFILE_FAIL:
            return { ...state, loading: false, error: payload }
        default:
            return state
    }
}
