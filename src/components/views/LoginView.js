import React, {useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useHistory} from "react-router";
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
                    console.log(res);
                    history.push('/profile');
                }else{
                    setLogStatus(false);
                }
            });
    }

    return(
        <>
            <div className="login-view">
                <div className="form-container">
                    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                        <label>Username: </label>
                        <input ref={register({required: true,minLength: 3})} name="username"/>
                        {errors.username && "Invalid username"}
                        <label>Password: </label>
                        <input ref={register({required: true,minLength: 3})} name="password"/>
                        {errors.password && "Invalid password"}
                        <button>Submit</button>
                    </form>
                    { logStatus===false ? "Błędne dane. Logowanie nie powiodło się":''}
                </div>
            </div>
        </>
    );
}
export default LoginView;
