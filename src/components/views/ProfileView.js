import Navigation from "../common/Navigation";
import React, {useState} from "react";
import {useHistory} from "react-router";
import ShoppingCart from "./ShoppingCart";
import '../../css/ProfileView.css';
import axios from "axios";

function getPreviousUserFlights() {
    var user = window.sessionStorage.getItem("user");
    user = JSON.parse(user);

    if (user.id) {
        axios.get("https://bakent.herokuapp.com/tickets/user/" + user.id)
                .then(res => {
                    var display = "";
                    if (res.data !== null && res.data !== "" && res.data.length !== 0) {
                        display = '<div class="shopping-cart" style="width:95%; margin-top:0"><div class="shop-items">'
                        res.data.forEach((item) => {
                            console.log(item);
                            display += '<div class="item"><div class="arrow">z</div>'+
                            '<div class="from">'+item.flight.portLink.startingPort.name+', '+item.flight.portLink.startingPort.planet.name+'</div>'+
                            '<div class="arrow">do</div>'+
                            '<div class="to">'+item.flight.portLink.endPort.name+', '+item.flight.portLink.endPort.planet.name+'</div>'+
                            '<div class="arrow">wylot</div>'+
                            '<div class="price">'+item.flight.start_date+'</div>'+
                            '</div>'
                        });
                        display += "</div></div>";
                    } else {
                        display = "Brak poprzednich transakcji.";
                    }
                    document.getElementById("previous-transactions").innerHTML = display;
                });
    }
}

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
                            <div id="previous-transactions">{getPreviousUserFlights()}Brak poprzednich transakcji.</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
