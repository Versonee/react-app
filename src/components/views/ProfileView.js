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
                        <div className="description">User information</div>
                        <div className="account">
                            <div className="name">{user.firstName}</div>
                            <div className="lastname">{user.lastName}</div>
                            <div className="login">({user.login})</div>
                        </div>
                        <div className="sex">Sex: {user.sex}</div>
                        <div className="birthday">Birthday: {user.dateOfBirth}</div>
                    </div>
                    <ShoppingCart removeTrigger={props.removeTrigger} shopList={props.shopList}/>
                    <div className="history">
                        <div className="description">Transaction history</div>
                        <div className="empty-message">No data about previous transactions.</div>
                    </div>
                    <div className="footer">
                        <div className="footer-text">Lot w Kosmos, ul. Wiejska 45A, 15-351 Białystok</div>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}
