import {initialState, Note, Notes} from "../../model/note";

export const ADD_NOTE_ACTION = "ADD_NOTE_ACTION"
export const EDIT_NOTE_ACTION = "EDIT_NOTE_ACTION"
export const DELETE_NOTE_ACTION = "DELETE_NOTE_ACTION"
export const LIST_NOTE_ACTION = "LIST_NOTE_ACTION"

function note (state = initialState, action : {type:string, payload:Notes, single:Note} ){
    switch(action.type){
        case ADD_NOTE_ACTION:
            return {
                payload: [...state.payload, action.single],
                single: action.single,
            }
        case EDIT_NOTE_ACTION:
            return {
                payload: [...state.payload.filter(u => u.id !== action.single.id), action.single],
                single: action.single,
            }
        case DELETE_NOTE_ACTION:
            return {
                payload: [...state.payload.filter(u => u.id !== action.single.id)],
            }
        case LIST_NOTE_ACTION:
            return{
                payload: [...state.payload,...action.payload],
                single: state.single,
            }
        default:
            return state
    }
}

export default note