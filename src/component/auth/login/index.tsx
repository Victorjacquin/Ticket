import React, {useState} from 'react';
import {Formik, useFormik} from 'formik' ;
import * as Yup from 'yup';
import * as api from '../../../adapter/auth'
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../../action/auth";
import store from "../../../reducer";
import auths from "../../../reducer/auth";
import {AxiosError} from "axios";
import "bootstrap/js/dist/dropdown"



const Login = () => {
    const dispatch = useDispatch();

    const state = useSelector((state :any) => state.auth);
    const [error, setError] = useState<string>()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema:Yup.object({
            email: Yup.string()
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required'),
        }),
        onSubmit: (values, formikHelpers) => {
            setError(undefined)
            api.login(values.email, values.password).
           then(resp => {
                // HANDLE RESPONSE DATA
                dispatch(actions.loginSuccess(resp.data.token,values.email));
                console.log(state.auth)
            }).catch((error: AxiosError) => {
                // HANDLE ERROR
                setError(error.response?.statusText)
            });
        },


    });


    return (
        <form onSubmit={formik.handleSubmit} className="mt-5">
            {!!error && <p className={"alert alert-danger"}>
                {error}
            </p>}
            <div className="d-print-block">
            <label htmlFor="email" >Email :</label>
            <input
                id="username"
                type="email"
                {...formik.getFieldProps('email')}
            /></div>
            <div className="d-print-block">
            {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
            ) : null}
            <label htmlFor="password">Password : </label>
            <input
                id="password"
                type="password"
                {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
            ) : null}</div>

            <button disabled={formik.isSubmitting} type="submit">Submit</button>
        </form>
    );


};



export default Login;