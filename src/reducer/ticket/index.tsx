import {initialState, Ticket, Tickets} from "../../model/ticket";

export const ADD_TICKET_ACTION = "ADD_TICKET_ACTION"
export const EDIT_TICKET_ACTION = "EDIT_TICKET_ACTION"
export const EDIT_TICKET_STATUS_ACTION = "EDIT_TICKET_STATUS_ACTION"
export const DELETE_TICKET_ACTION = "DELETE_TICKET_ACTION"
export const LIST_TICKET_ACTION = "LIST_TICKET_ACTION"
export const LIST_TICKET_ACTION_SUCCESS = "LIST_TICKET_ACTION_SUCCESS"
export const SHOW_TICKET_ACTION = "SHOW_TICKET_ACTION"

function ticket (state = initialState, action : {type:string, payload:Tickets, single:Ticket} ){
    switch(action.type){
        case ADD_TICKET_ACTION:
            return {
                payload: [...state.payload, action.single],
                single: action.single,

            }
        case EDIT_TICKET_ACTION:
            return {
                payload: [...state.payload.filter(u => u.id !== action.single.id), action.single],
                single: action.single,
            }
        case DELETE_TICKET_ACTION:
            return {
                payload: [...state.payload.filter(u => u.id !== action.single.id)],
            }
        case LIST_TICKET_ACTION:
            return{
                payload: [],
                single: state.single,
            }
        case LIST_TICKET_ACTION_SUCCESS:
            return{
                payload: [...state.payload,...action.payload],
                single: state.single,
            }
        case SHOW_TICKET_ACTION:
            return{
                payload: [...state.payload],
                single: action.single,
            }
        default:
            return state
    }
}

export default ticket