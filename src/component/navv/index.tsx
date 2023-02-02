import React from "react";
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import App from "../../App";
import Login from "../auth/login";
import Ticket from "../ticket/list";
import ShowTicket from "../ticket/show";
import {type} from "os";
import {useDispatch, useSelector} from "react-redux";
import * as actionsAuth from "../../action/auth";
import 'bootstrap/dist/css/bootstrap.min.css';



const Nav:React.FC=()=>{

    const dispatch = useDispatch();
    const state = useSelector((state: any) => state)

    return <BrowserRouter>
        <div>
            {!!state.auth.token &&
               [
                   <nav className="navbar  navbar-dark bg-primary text-light">
                       <Link to={"ticket"} className={"nav-item nav-link active ms-3"}>Tickets</Link>
                       {!!state.auth.token && <button className={'btn btn-danger float-end margin_right'} onClick={() => dispatch(actionsAuth.logout())
                       }>
                           Déconnexion
                       </button>}

                   </nav>

               ]
            }

        </div>
        <div className="container mx-auto">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path={"ticket"} element={<PrivateRoute><Ticket/></PrivateRoute>}  />
                <Route path={"login"} element={<GuestRoute><Login/></GuestRoute>}/>
                <Route path={"show-ticket/:id"} element={<PrivateRoute><ShowTicket/></PrivateRoute>}  />
            </Routes>
        </div>
    </BrowserRouter>
}

const PrivateRoute = (props: any) => {

    const {children} = props;
    const state = useSelector((state: any) => state)
    const isLogged = !!state.auth.token;

    if (!isLogged) {
        return <Navigate to={'/login'} replace />;
    }

    return children;
}

const GuestRoute = (props: any) => {

    const {children} = props;
    const state = useSelector((state: any) => state)
    const isLogged = !!state.auth.token;

    if (isLogged) {
        return <Navigate to={'/ticket'} replace />;
    }

    return children;
}


export default Nav;