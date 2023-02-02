import {
    ADD_TICKET_ACTION,
    DELETE_TICKET_ACTION,
    EDIT_TICKET_ACTION,
    LIST_TICKET_ACTION, LIST_TICKET_ACTION_SUCCESS,
    SHOW_TICKET_ACTION
} from "../../reducer/ticket";
import {Ticket, Tickets} from "../../model/ticket";

export const addTicketAction = (ticket: { name: string; description: string; page: string }) => ({
    type: ADD_TICKET_ACTION,
    single: ticket
})

export const deleteTicketAction = ( ticket : Ticket) => ({
    type: DELETE_TICKET_ACTION,
    single: ticket
})

export const editTicketAction = ( ticket : Ticket) => ({
    type: EDIT_TICKET_ACTION,
    single: ticket
})


export const listTicketAction = () => ({
    type: LIST_TICKET_ACTION
})


export const listTicketActionSuccess = ( tickets : Tickets) => ({
    type: LIST_TICKET_ACTION_SUCCESS,
    payload: tickets
})

export const showTicketAction = ( ticket : Ticket) => ({
    type: SHOW_TICKET_ACTION,
    single: ticket
})