import {DELETE_NOTE_ACTION, EDIT_NOTE_ACTION, LIST_NOTE_ACTION, ADD_NOTE_ACTION} from "../../reducer/note";
import {Note, Notes} from "../../model/note";

export const addNoteAction = ( note : Note) => ({
    type: ADD_NOTE_ACTION,
    payload: note
})

export const deleteNoteAction = (note : Note) => ({
    type: DELETE_NOTE_ACTION,
    payload: note
})

export const editNoteAction = (note : Note) => ({
    type: EDIT_NOTE_ACTION,
    payload: note
})

export const listNoteAction = (notes : Notes) => ({
    type: LIST_NOTE_ACTION,
    payload: notes
})