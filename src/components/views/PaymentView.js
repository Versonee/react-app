import Navigation from "../common/Navigation";
import React, {useState} from "react";
import {useHistory} from "react-router";
import '../../css/PaymentView.css';
import axios from "axios";

export default function PaymentView(props){
    let history = useHistory();
    let discountCodes = [
        'KAROLINA',
        'MATEUSZ',
        'KAMIL',
        'URSZULA'
    ];
    const [discount, setDiscount] = useState(0);
    const [shopList] = useState(props.shopList || []);
    const handlePaymentButton = () => {
        let url = 'https://bakent.herokuapp.com/tickets';
        let headers =  {
            "Access-Control-Allow-Origin":"*",
            "Content-Type":"application/json"
        }

        var user = window.sessionStorage.getItem("user");
        user = JSON.parse(user);

        props.shopList.forEach((item) => {
            let data = {
                bought: new Date().toISOString(),
                flight: {
                    end_date: item.end_date,
                    id: item.id,
                    maxSize: item.maxSize,
                    portLink: {
                        endPort: {
                            description: item.portLink.endPort.description,
                            id: item.portLink.endPort.id,
                            name: item.portLink.endPort.name,
                            planet: {
                                description: item.portLink.endPort.planet.description,
                                distanceFromTheSun: item.portLink.endPort.planet.distanceFromTheSun,
                                id: item.portLink.endPort.planet.id,
                                name: item.portLink.endPort.planet.name
                            }
                        },
                        id: item.portLink.id,
                        startingPort: {
                            description: item.portLink.startingPort.description,
                            id: item.portLink.startingPort.id,
                            name: item.portLink.startingPort.name,
                            planet: {
                                description: item.portLink.startingPort.planet.description,
                                distanceFromTheSun: item.portLink.startingPort.planet.distanceFromTheSun,
                                id: item.portLink.startingPort.planet.id,
                                name: item.portLink.startingPort.planet.name
                            }
                        }
                    },
                    start_date: item.start_date,
                    ticketPrice: item.ticketPrice
                },
                user: {
                    date_of_birth: user.dateOfBirth,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    login: user.login,
                    password: user.password,
                    sex: user.sex,
                    id: user.id
                }
            }

            axios.post(url, data, headers);
        });
        props.updateShopList(JSON.parse( "[]"));
        window.localStorage.setItem("shopping-card-list",JSON.stringify([]));
        alert("Dziękujemy za zakup.");
        history.push("/profile");
    }
    const getTotalCost = () =>{
        let cost=0;
        shopList.forEach((value)=>{
            cost+=parseFloat(value.ticketPrice);
        })
        return cost*(1-discount);
    }
    const checkCode = (code) =>{
        if(discountCodes.includes(code.target.value)) setDiscount(0.1);
        else setDiscount(0);
    }
    return(
        <>
            <Navigation toggleable={0}/>
            <div className="payment-background">
                <div className="payment-wrapper">
                    <div className="container">
                        <div className="total-cost">{getTotalCost()}</div>
                        <div className="payment-button" onClick={handlePaymentButton}>zapłać</div>
                    </div>
                    <input className="discountInput" type="text" onChange={checkCode} placeholder="Kod zniżkowy"/>
                </div>
            </div>
        </>
    );
}
