import React, {useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useHistory} from "react-router";
import '../../css/LoginView.css';
import {Link} from "react-router-dom";
import Navigation from "../common/Navigation";
const LoginView = (props) =>{
    const { register, errors, handleSubmit } = useForm();
    const [logStatus, setLogStatus] = useState(null);
    let history = useHistory();
    const onSubmit = data => {

        const url = 'https://bakent.herokuapp.com/users';
        const user = {
            login: data.username,
            password: data.password,
        }
        const headers =  {
            "Access-Control-Allow-Origin":"*",
            "Content-Type":"application/json"
        }
        axios.get(url+`/search/${user.login}/${user.password}`,headers)
            .then(res => {
                if(res.data){
                    props.updateUser(res.data);
                    // console.log(res);
                    history.push('/profile');
                }else{
                    setLogStatus(false);
                }
            });
    }
    return(
        <>
            <div className="login-background">
                <Navigation toggleable={0}/>
                <div className="login-wrapper">
                    <div className="login-view">
                        <div className="form-container">
                            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                                <label>Login: </label>
                                    <div >
                                        <input className="login-fields" ref={register({required: true,minLength: 3})} name="username"/>
                                    </div>
                                    {errors.username && "Błędna nazwa użytkownika"}
                                <label>Hasło: </label>
                                    <div >
                                        <input type="password" className="login-fields" ref={register({required: true,minLength: 3})} name="password"/>
                                    </div>
                                    {errors.password && "Błędne hasło"}
                                <div className="login-button">
                                    <button >Zaloguj się</button>
                                </div>
                                <Link to="/register">
                                <div className="login-button">
                                    <button >Zarejestruj się</button>
                                </div></Link>
                            </form>
                            { logStatus===false ? "Błędne dane. Logowanie nie powiodło się":''}
                        </div>
                    </div>

                </div>
                <div className="footer1">
                    <div className="footer-text1">Lot w Kosmos, ul. Wiejska 45A, 15-351 Białystok</div>
                </div>
            </div>
        </>
    );
}
export default LoginView;
