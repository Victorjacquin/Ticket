import {get, post} from "../xhr";
import {Ticket} from "../../model/ticket";

export function list(signal: AbortSignal){
    return get('ticket', {signal: signal})
}

export function show(signal : AbortSignal, id?: string){
    return get(`ticket/${id}`)
}

export function add(requestdata: {name: string}){
    return post('ticket/add', requestdata)
}

export function sup(id: number){
    return get(`ticket/sup/${id}`)
}

export function status(id: number, status: number){
    return get(`ticket/status/${id}/${status}`)
}