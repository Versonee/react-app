import Navigation from "../common/Navigation";
import React, {useState} from "react";
import {useHistory} from "react-router";
import ShoppingCart from "./ShoppingCart";
import '../../css/ProfileView.css';

export default function ProfileView(props){
    const [user] = useState(JSON.parse(window.sessionStorage.getItem("user")) || props.user);
    let history = useHistory();
    return(
        <>
            {user?'':history.push('/login')}
            <Navigation toggleable={0}/>
            <div className="profile-background">
                <div className="profile-wrapper">
                    <div className="profile-view">
                        <div className="user-info">
                            <div className="description">Informacje użytkownika</div>
                            <div className="account">
                                <div className="name">{user.firstName}</div>
                                <div className="lastname">{user.lastName}</div>
                                <div className="login">({user.login})</div>
                            </div>
                            <div className="sex">Płeć: {user.sex}</div>
                            <div className="birthday">Data urodzenia: {user.dateOfBirth}</div>
                        </div>
                        <ShoppingCart removeTrigger={props.removeTrigger} shopList={props.shopList}/>
                        <div className="history">
                            <div className="description">Historia transakcji</div>
                            <div className="empty-message">Brak poprzednich transakcji.</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
