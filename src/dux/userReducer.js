import axios from 'axios'

const initialState = {
    usernameInput: '',
    passInput: '',
    user: {},
    userLoggedIn: false,
    loading: false,
    error: false
}

const LOGIN = 'LOGIN'
const GET_USER = 'GET_USER'
const UPDATE_USERNAME_INPUT = 'UPDATE_USERNAME_INPUT'
const UPDATE_PASSWORD_INPUT = 'UPDATE_PASSWORD_INPUT'

export const updateUsernameInput = payload => {
    return {
        payload,
        type: UPDATE_USERNAME_INPUT
    }
}

export const updatePasswordInput = payload => {
    return {
        payload,
        type: UPDATE_PASSWORD_INPUT
    }
}

export const login = (username, password) => {
const user = axios.post('/auth/login', {username, password})
    return {
        type: LOGIN,
        payload: user
    }
}


 export default function userReducer(state = initialState, action){
     const {payload, type} = action
     switch(type){
         case UPDATE_USERNAME_INPUT:
             return {...state, usernameInput: payload}
         case UPDATE_PASSWORD_INPUT:
             return {...state, passInput: payload}
             
         case LOGIN + '_PENDING':
             return {...state, loading: true}
         case LOGIN + '_FULFILLED':
             return {...state, loading: false, user: payload.data, userLoggedIn:true}
         case LOGIN + '_REJECTED':
             return {...state, loading:false, error: true}      
     default:
         return state
        }
 }

