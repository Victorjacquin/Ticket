import React, {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import * as userModel from "../../../model/user";
import * as model from "../../../model/ticket"
import * as api from "../../../adapter/ticket"
import * as actions from "../../../action/ticket"
import {Link} from "react-router-dom";
import TicketListItem from "./item";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import * as actionsauth from "../../../action/auth";
import {Modal} from "bootstrap";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Ce champ est obligatoire"),
    description: Yup.string()
        .required("Ce champ est obligatoire"),
    page: Yup.string()
        .required("Ce champ est obligatoire"),

})

const initialValues = {
    name: "",
    description: "",
    page: "",
};


const Ticket:React.FC = () => {



    const dispatch = useDispatch();
    const tickets = useSelector((state: any) => state.tickets.payload)

    const [modal, setModal] = useState<Modal>()

    useEffect(() => {
        const container = document.getElementById("exampleModal")!;
        setModal(new Modal(container))
    },[])


    const formik = useFormik({
            initialValues: initialValues,
            validationSchema: validationSchema,
            onSubmit: (values, formikHelpers) => {

                api.add(values)
                    .then(data => {
                        dispatch(actions.addTicketAction(data.data))
                        modal?.toggle()
                    })
                    .catch(error => console.log(error))

            }


        }

    )

    useEffect(() => {
        let controller = new AbortController();

        dispatch(actions.listTicketAction())

        api.list(controller.signal)
            .then(data => {
        dispatch(actions.listTicketActionSuccess(data.data))
            })
            .catch(error => console.log(error))

        return () => controller.abort();
    },[])


    return <>
        <h1>Les Tickets</h1>
        <button type="button" className="btn btn-primary" onClick={()=>modal?.toggle()}>
            Ajouter un ticket
        </button>

        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Ajouter un ticket</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                        <div className="modal-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mb-3">
                                    <input type={"text"} name={"name"} placeholder={"name"} onChange={formik.handleChange}/></div>
                                <div className="mb-3">
                                    <input type={"text"} name={"description"} placeholder={"description"} onChange={formik.handleChange}/></div>
                                <div className="mb-3">
                                    <input type={"text"} name={"page"} placeholder={"page"} onChange={formik.handleChange}/></div>
                                <button type="submit" className="btn btn-primary">Ajouter</button>

                            </form>

                        </div>
                </div>
            </div>
        </div>



        <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active" id="pending-tab" data-bs-toggle="tab" data-bs-target="#pending-tab-pane"
                        type="button" role="tab" aria-controls="pending-tab-pane" aria-selected="true">En attente
                </button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="encours-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane"
                        type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">En cours
                </button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="termine-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane"
                        type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Terminé
                </button>
            </li>
        </ul>
        <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="pending-tab-pane" role="tabpanel" aria-labelledby="pending-tab"
                 tabIndex={0}>
                <TicketListItem tickets={tickets} status={1} />
            </div>

            <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab"
                 tabIndex={0}>
                <TicketListItem tickets={tickets} status={2} />
            </div>

            <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab"
                 tabIndex={0}>
                <TicketListItem tickets={tickets} status={3} />
            </div>
        </div>
    </>

}

export default Ticket;