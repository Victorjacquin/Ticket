import {Message} from "../message";
import {User, Users} from "../user";

export interface File {
    id: number,
    message : Message,
}

export type Files = File[]

export interface InitialStateInterface {
    payload: Files,
    single?: File,

}

export const initialState: InitialStateInterface = {
    payload: [],
}