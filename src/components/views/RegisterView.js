import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import '../../css/RegisterView.css';
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";

export default function RegisterView(props) {
    const { register,errors, handleSubmit } = useForm();

    let handleClickSuccess;
    let handleClickError;
    handleClickError = () =>
        toast.error("Nie dodano użytkownika", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
    handleClickSuccess = () => {
        window.location.href = "/login";
    }

    let maxDate = () => {
        var date = new Date();
        date.setYear(date.getFullYear() - 18);
        return date.toISOString().split('T')[0];
    }

    let minDate = () => {
        var date = new Date();
        date.setYear(date.getFullYear() - 120);
        return date.toISOString().split('T')[0];
    }

    const onSubmit = data => {
        const url = 'https://bakent.herokuapp.com/users';
        const user = {
            login: data.login,
            password: data.password,
            sex: data.sex,
            firstName: data.firstName,
            lastName: data.lastName,
            date_of_birth: data.date_of_birth,
        }
        const headers =  {
            "Access-Control-Allow-Origin":"*",
            "Content-Type":"application/json"
        }
        axios.post(url, user, headers)
            .then(res => {
                if(res.status===200){
                    console.log("Pomyślnie zarejestrowano");
                    handleClickSuccess();
                }else{
                    console.log("Rejestracja nie powiodła się");
                    handleClickError();
                }
            });
    }

    const validatePassword = (value) => {
        var pattern = new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"
        );
        return pattern.test(value);
    }

    return(
        <div className="register-background">
            <div className="nav"></div>
            <div className="register-wrapper">
                <div className="register-view">
                    <div className="form-container">
                        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                            <label>Imię: </label>
                            <input className="register-fields"  ref={register({required:true, minLength:3})} name="firstName"/>
                            <div className="register-errors">{errors.firstName && "Imię musi zawierać co najmniej 3 litery."}</div>
                            <label>Nazwisko: </label>
                            <input className="register-fields" ref={register({required:true, minLength:3})} name="lastName"/>
                            <div className="register-errors">{errors.lastName && "Nazwisko musi zawierać co najmniej 3 litery."}</div>
                            <label>Nazwa użytkownika: </label>
                            <input className="register-fields" ref={register({required:true, minLength:3})} name="login"/>
                            <div className="register-errors">{errors.login && "Nazwa użytkownika musi zawierać co najmniej 3 litery."}</div>
                            <label>Hasło: </label>
                            <input type ="password" className="register-fields" ref={register({required:true, minLength:8, validate: validatePassword})} name="password"/>
                            <div className="register-errors">{errors.password && "Hasło musi zawierać co najmniej 8 znaków, dużą literę, małą literę i cyfrę."}</div>
                            <label>Data urodzenia: </label>
                            <input className="register-fields" type="date" min={minDate()} max={maxDate()} ref={register({required:true})} name="date_of_birth"/>

                            <div className="gender">
                                <label>Płeć: </label>
                                <input ref={register({required:true})} type="radio" value="M" name="sex" /> mężczyzna
                                <input ref={register({required:true})} type="radio" value="K" name="sex" /> kobieta
                                <div className="register-errors">{errors.sex && "Podaj płeć."}</div>
                            </div>
                            <div className="register-button">
                                <button >Zarejestruj się</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="footer-text">Lot w Kosmos, ul. Wiejska 45A, 15-351 Białystok</div>
            </div>
            <ToastContainer/>
        </div>
    );
}
