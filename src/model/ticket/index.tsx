import {User, Users} from "../user";

export interface Ticket {
    id: number,
    name: string,
    description : string,
    createdBy?: User,
    supportedBy?: User,
    createdAt: Date,
    page: string,
    status: number

}

export type Tickets = Ticket[]

export interface InitialStateInterface {
    payload: Tickets,
    single?: Ticket,

}

export const initialState: InitialStateInterface = {
    payload: [],
    single: undefined
}
