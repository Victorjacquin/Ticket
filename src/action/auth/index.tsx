import {LOGIN_SUCCESS, LOGIN, LOGIN_FAILURE, LOGOUT} from "../../reducer/auth";

import {Auth} from "../../model/auth";

export const loginSuccess = (token: string, email: string) => ({
    type: LOGIN_SUCCESS,
    token: token,
    email:email
})

export const login = (auth: Auth) => ({
    type: LOGIN,
    token: auth
})

export const login_Failure = (auth: Auth) => ({
    type: LOGIN_FAILURE,
    token: auth
})

export const logout = () => ({
    type: LOGOUT
})

