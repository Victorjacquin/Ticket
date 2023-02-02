import {User, Users} from "../user";
import {Ticket} from "../ticket";
import {File} from "../file";

export interface Message {
    id: number,
    user: User,
    content : string,
    createdAt : Date,
    ticket: Ticket,
    files?: File
}

export type Messages = Message[]

export interface InitialStateInterface {
    payload: Messages,
    single?: Message,

}

export const initialState: InitialStateInterface = {
    payload: [],
}