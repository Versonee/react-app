import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import '../../css/RegisterView.css';
export default function RegisterView(props) {
    const { register,errors, handleSubmit } = useForm();

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
                }else{
                    console.log("Rejestracja nie powiodła się");
                }
            });
    }

    return(
        <div className="register-background">
            <div className="nav"></div>
            <div className="register-wrapper">
                <div className="register-view">
                    <div className="form-container">
                        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                            <label>First name: </label>
                            <input className="register-fields"  ref={register({required:true, minLength:3})} name="firstName"/>
                            {errors.firstName && "Invalid first name"}
                            <label>Last name: </label>
                            <input className="register-fields" ref={register({required:true, minLength:3})} name="lastName"/>
                            {errors.lastName && "Invalid last name"}
                            <label>Username: </label>
                            <input className="register-fields" ref={register({required:true, minLength:3})} name="login"/>
                            {errors.login && "Invalid username"}
                            <label>Password: </label>
                            <input className="register-fields" ref={register({required:true, minLength:3})} name="password"/>
                            {errors.password && "Invalid password"}
                            <label>Date of birth: </label>
                            <input className="register-fields" type="date" ref={register({required:true})} name="date_of_birth"/>

                            <div className="gender">
                                <label>Gender: </label>
                                <input ref={register({required:true})} type="radio" value="M" name="sex" /> male
                                <input ref={register({required:true})} type="radio" value="K" name="sex" /> female
                                {errors.sex && "Sex required"}
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
        </div>
    );
}
