import {User, Users} from "../user";
import {Ticket} from "../ticket";

export interface Note {
    id?: number,
    description : string,
    user?: User,
    ticket?: Ticket,

}

export type Notes = Note[]

export interface InitialStateInterface {
    payload: Notes,
    single?: Note,

}

export const initialState: InitialStateInterface = {
    payload: [],
}
