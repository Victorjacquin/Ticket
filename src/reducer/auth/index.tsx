import {initialState} from "../../model/auth";

export const LOGIN = "LOGIN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"
export const LOGOUT = "LOGOUT"


function auth (state = initialState, action : {type:string, token: string, email:string} ){
    switch(action.type){
        case LOGIN_SUCCESS:
            saveAuth(action.token, action.email )
            return {
                token: action.token,
                email:action.email
            }
        case LOGOUT:
            deleteAuth()
            return {token: null}
        default:
            return state
    }
}

const saveAuth = (token : string, email : string) => {
    localStorage.setItem("token", token)
    localStorage.setItem("email",email)
}

const deleteAuth = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
}

export default auth