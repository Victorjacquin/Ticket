import {Ticket, Tickets} from "../ticket";

export interface User {
    id: number,
    email: string,
    name : string
    tickets: Tickets
}

export type Users = User[]

export interface InitialStateInterface {
    payload: Users,
    single?: User,

}

export const initialState: InitialStateInterface = {
    payload: [],
}