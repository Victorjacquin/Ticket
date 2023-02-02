import Axios, {ResponseType} from "axios";
import {User} from "../../model/user";

export const MULTIPART_FORM_DATA = 'MULTIPART_FORM_DATA';
export const APPLICATION_PDF = 'application/pdf';
export const SWITCH_USER = 'x-switch-user';
export const DISABLED_SWITCH = 'DISABLED_SWITCH';

const API_DEV_URl = "http://localhost:8000/"

const headers = (additionalHeaders?: string[]) => {

    const ret =  {
        'Content-Type': 'application/json',
    }

    const token = localStorage.getItem('token')

    if (additionalHeaders){
        for (let i = 0; i < additionalHeaders.length; i++){
            switch (additionalHeaders[i]){
                case MULTIPART_FORM_DATA:
                    Object.assign(ret, {'Content-Type': 'multipart/form-data'})
                    break;
                case DISABLED_SWITCH:
                    break;
                case APPLICATION_PDF:
                    Object.assign(ret, {'ACCEPT': 'application/pdf'})
                    break;
                default:
                    Object.assign(ret, JSON.parse(additionalHeaders[i]))
                    break;
            }
        }
    }

    if (localStorage.getItem('impersonated') && !ret.hasOwnProperty(SWITCH_USER) && !additionalHeaders?.includes(DISABLED_SWITCH)){
        let impersonated: User = JSON.parse(localStorage.getItem('impersonated')!)
            Object.assign(ret, {'x-switch-user': impersonated.email})
    }

    if (token){
        Object.assign(ret, {'Authorization': 'Bearer ' + token})
    }

    return ret;
}

export interface Options {
    headers?: string[]
    responseType?: ResponseType,
    timeout?: number,
    signal?: AbortSignal
}

const instance = (options?: Options) => {
    return Axios.create({
        baseURL: API_DEV_URl,
        headers : headers(options?.headers),
        responseType: options?.responseType,
        timeout: options?.timeout,
        transformResponse: [function (data) {
            if (isJson(data))
                return JSON.parse(data);
            return data
        }],
    })
}

function isJson(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export function get(url: string, options?:Options){

    const api = instance(options);
    return api.get(url, {
        signal: options?.signal,
    });
}

export function post(url: string, requestData:object, options?:Options){

    const api = instance(options);
    return api.post(url, requestData, {
        signal: options?.signal
    });
}
