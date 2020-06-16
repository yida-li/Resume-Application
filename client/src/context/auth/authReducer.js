import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_ERRORS,
    USER_LOADED,
    AUTH_ERROR
} from '../Types'

const authReducer = (state, action) => {
    switch(action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:     {
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL: 
        case LOGOUT: {
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: true,
                user: null,
                error: action.payload || null
            }
        }
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null
            }
        }
        case USER_LOADED: {
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export default authReducer