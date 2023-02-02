import {
    DELETE_MESSAGE_ACTION,
    EDIT_MESSAGE_ACTION,
    LIST_MESSAGE_ACTION,
    ADD_MESSAGE_ACTION,
    LIST_MESSAGE_BY_TICKET,
    LIST_MESSAGE_BY_TICKET_SUCCESS
} from "../../reducer/message";
import {Message, Messages} from "../../model/message";
import {LIST_TICKET_ACTION} from "../../reducer/ticket";

export const addMessageAction = (message : { content:string }) => ({
    type: ADD_MESSAGE_ACTION,
    single: message
})

export const deleteMessageAction = (message : Message) => ({
    type: DELETE_MESSAGE_ACTION,
    payload: message
})

export const editMessageAction = (message : Message) => ({
    type: EDIT_MESSAGE_ACTION,
    payload: message
})

export const listMessageAction = (messages : Messages) => ({
    type: LIST_MESSAGE_ACTION,
    payload: messages
})

export const listMessagebyTicket = () => ({
    type: LIST_MESSAGE_BY_TICKET
})

export const listMessageByTicketSuccess = (messages :{ ticket: number}) => ({
    type: LIST_MESSAGE_BY_TICKET_SUCCESS,
    payload : messages
})