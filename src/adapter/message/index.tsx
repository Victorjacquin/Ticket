import {get, post} from "../xhr";
import message from "../../reducer/message";

export function add(requestdata: {content: string, ticket:number}){
    return post('message/add', requestdata)
}

export function showByTicket(requestdata:{ticket :number} ){
    return post(`messagebyticket`, requestdata)
}