import {initialState, InitialStateInterface, User, Users} from "../../model/user";

export const ADD_USER_ACTION = "ADD_USER_ACTION"
export const EDIT_USER_ACTION = "EDIT_USER_ACTION"
export const DELETE_USER_ACTION = "DELETE_USER_ACTION"
export const LIST_USER_ACTION = "LIST_USER_ACTION"

function user (state = initialState, action: {type:string, payload:Users, single:User} ){
    switch(action.type){
        case ADD_USER_ACTION:
            return {
                payload: [...state.payload, action.single],
                single: action.single,
            }
        case EDIT_USER_ACTION:
            return {
                payload: [...state.payload.filter(u => u.id !== action.single.id), action.single],
                single: action.single,
            }
        case DELETE_USER_ACTION:
            return {
                payload: [...state.payload.filter(u => u.id !== action.single.id)],
            }
        case LIST_USER_ACTION:
            return{
            payload: [...state.payload,...action.payload],
            single: state.single,
        }
        default:
            return state
    }
}

export default user