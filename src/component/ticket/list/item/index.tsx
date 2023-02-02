import {Tickets} from "../../../../model/ticket";
import React, {useEffect} from "react";
import * as api from "../../../../adapter/ticket";
import {useDispatch} from "react-redux";
import {editTicketAction} from "../../../../action/ticket";
import ShowTicket from "../../show";
import {Link} from "react-router-dom";


interface Item {
    tickets: Tickets,
    status: number,
}

const TicketListItem:React.FC<Item> = (props) => {
    const {tickets, status} = props;

    const dispatch = useDispatch()
    const handleStatusChange = (id: number, status: number) => {
        api.status(id, status).then(data => {
            dispatch(editTicketAction(data.data))
        })
    }

    return <ul className={'list-group list-group-flush'}>
        {tickets.filter(t => t.status === status).map((t, index) => <li key={index} className={'list-group-item'}>


               <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                    <Link to={`../show-ticket/${t.id}`} >
                    {t.name}
                    </Link>

                </div>

                <div className="flex-grow-0">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id={`dropdownMenu${index}`}
                                data-bs-toggle="dropdown" aria-expanded="false">
                            Changer état
                        </button>
                        <ul className="dropdown-menu" aria-labelledby={`dropdownMenu${index}`}>
                            {t.status !== 1 && <li><button className="dropdown-item" onClick={() => handleStatusChange(t.id, 1)}>En attente</button></li>}
                            {t.status !== 2 && <li><button className="dropdown-item" onClick={() => handleStatusChange(t.id, 2)}>En cours</button></li>}
                            {t.status !== 3 && <li><button className="dropdown-item" onClick={() => handleStatusChange(t.id, 3)}>Terminé</button></li>}
                        </ul>
                    </div>
                </div>
            </div>
            </li>)}
    </ul>
}

export default TicketListItem;