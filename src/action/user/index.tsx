import {ADD_USER_ACTION, DELETE_USER_ACTION, EDIT_USER_ACTION, LIST_USER_ACTION} from "../../reducer/user";
import {User, Users} from "../../model/user";

export const addUserAction = (user : User) => ({
    type: ADD_USER_ACTION,
    single: user
})

export const deleteUserAction = (user : User) => ({
    type: DELETE_USER_ACTION,
    payload: user
})

export const editUserAction = (user : User) => ({
    type: EDIT_USER_ACTION,
    payload: user
})

export const listUserAction = (users: Users) => ({
    type: LIST_USER_ACTION,
    payload: users
})