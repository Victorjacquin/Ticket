import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as api from "../../../adapter/ticket";
import * as actions from "../../../action/ticket";
import ticket from "../../../reducer/ticket";
import Ticket from "../list";
import {Interface} from "readline";
import {Link, useParams} from "react-router-dom";
import {Store} from "redux";
import store from "../../../reducer";
import {useFormik} from "formik";
import {AxiosError} from "axios";
import {logout} from "../../../action/auth";
import * as Yup from "yup";
import * as actionsmessage from "../../../action/message";
import * as apimessage from "../../../adapter/message"
import message from "../../../reducer/message";
import {Message, Messages} from "../../../model/message";


const validationSchema = Yup.object().shape({
    content: Yup.string()
        .required("Ce champ est obligatoire"),
    ticket: Yup.number()
        .required("Ce champ est obligatoire"),
})


const ShowTicket: React.FC = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const state = useSelector((state: any) => state);

    const initialValues = {
        content: "",
        ticket: Number(params.id!)
    };


    const formik = useFormik({
            initialValues: initialValues,
            validationSchema: validationSchema,
            onSubmit: (value, formikHelpers) => {

                apimessage.add(value)
                    .then(data => {
                        dispatch(actionsmessage.addMessageAction(data.data))
                    })
                    .catch(error => console.log(error))


            }


        }
    )

    useEffect(() => {
        let controller = new AbortController();
        apimessage.showByTicket({ticket: Number(params.id)})
            .then(data => {
                dispatch(actionsmessage.listMessagebyTicket())
                dispatch(actionsmessage.listMessageByTicketSuccess(data.data))
            })
            .catch(error => console.log(error))
        api.show(controller.signal, params.id)
            .then(data => {
                dispatch(actions.showTicketAction(data.data));
                console.log(state)

            })
            .catch((error: AxiosError) => {
                switch (error.response?.status) {
                    case 401:
                        dispatch(logout())
                        break;
                }

            })
        return () => controller.abort();

    }, [params.id])

    return <div className={"container-fluid"}>

        <div className="row ">
            <div className="col-12 col-md-6 mt-5">
                <ul className="list-group">
                    <li className="list-group-item">Nom : {state.tickets.single?.name}</li>
                    <li className="list-group-item">Description : {state.tickets.single?.description}</li>
                    <li className="list-group-item">Page : {state.tickets.single?.page}</li>
                    <li className="list-group-item">Créé par : {state.tickets.single?.createdBy.name}</li>


                </ul>
            </div>

            <div className="col-12 col-md-6 mt-5 h-25 ">


                     <div className="card  ">

                         <div className="card-body ">
                             <div className="overflow-auto box chat" >
                                  <div className="container_msg  ">

                                      {state.messages.payload.map((m: Message) => <div className={"d-flex " + (m.user.email === state.auth.email ? ' flex-row-reverse' : '')}>
                                          {m.user.email == state.auth.email && <div className="alert alert-primary col-auto mw-75 " role="alert">

                                          {m.content} {"de"} {m.user.name}
                                          </div>}
                                           {m.user.email !== state.auth.email && <div className="alert alert-warning col-auto mw-75 " role="alert">

                               {m.content} {"de"} {m.user.name}
                                  </div>}
                              </div>
                             )}


                    </div>

                </div>
                             <form onSubmit={formik.handleSubmit}>
                                 <div className="mb-3">
                                     <textarea className={"form-control"} id={"content"} placeholder="Message" onChange={formik.handleChange}></textarea>
                                 </div>
                                 <button type="submit" className="btn btn-primary float-end">Envoyer</button>
                             </form>
              </div>
            </div>




        </div>


        </div>


    </div>;
}

export default ShowTicket;