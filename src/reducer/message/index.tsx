import {initialState, Message, Messages} from "../../model/message";
import {LIST_TICKET_ACTION} from "../ticket";

export const ADD_MESSAGE_ACTION = "ADD_MESSAGE_ACTION"
export const EDIT_MESSAGE_ACTION = "EDIT_MESSAGE_ACTION"
export const DELETE_MESSAGE_ACTION = "DELETE_MESSAGE_ACTION"
export const LIST_MESSAGE_ACTION = "LIST_MESSAGE_ACTION"
export const LIST_MESSAGE_BY_TICKET = "LIST_MESSAGE_BY_TICKET"
export const LIST_MESSAGE_BY_TICKET_SUCCESS = "LIST_MESSAGE_BY_TICKET_SUCCESS"

function message (state = initialState, action : {type:string, payload:Messages, single:Message} ){
    switch(action.type){
        case ADD_MESSAGE_ACTION:
            return {
                payload: [...state.payload, action.single],
                single: action.single,
            }
        case EDIT_MESSAGE_ACTION:
            return {
                payload: [...state.payload.filter(u => u.id !== action.single.id), action.single],
                single: action.single,
            }
        case DELETE_MESSAGE_ACTION:
            return {
                payload: [...state.payload.filter(u => u.id !== action.single.id)],
            }
        case LIST_MESSAGE_ACTION:
            return{
                payload: [...state.payload,...action.payload],
                single: state.single,
            }
        case LIST_MESSAGE_BY_TICKET:
            return{
                payload: [],
                single: state.single,
            }

        case LIST_MESSAGE_BY_TICKET_SUCCESS:
            return{
                payload: [...state.payload,...action.payload],
                single: state.single,
            }
        default:
            return state
    }
}

export default message