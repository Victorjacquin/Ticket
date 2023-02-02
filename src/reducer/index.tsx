import {combineReducers, createStore} from "redux";
import ticket from "./ticket/index";
import user from "./user";
import note from "./note";
import message from "./message";
import auth from "./auth";

const store =createStore(
    combineReducers({
        tickets: ticket,
        users: user,
        notes: note,
        messages: message,
        auth: auth,
    })
)

export default store