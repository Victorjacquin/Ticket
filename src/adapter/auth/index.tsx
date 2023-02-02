import {get, post} from "../xhr";

export function login(username : string, password : string){
    return post('api/login_check', {username : username, password : password})
}