import Navigation from "../common/Navigation";
import React, {useState} from "react";
import {useHistory} from "react-router";
import '../../css/PaymentView.css';

export default function PaymentView(props){
    let history = useHistory();
    const [shopList] = useState(props.shopList || []);
    const handlePaymentButton = () =>{
        props.updateShopList(JSON.parse( "[]"));
        history.push("/profile");
    }
    const getTotalCost = () =>{
        let cost=0;
        shopList.forEach((value)=>{
            cost+=parseFloat(value.ticketPrice);
        })
        return cost;
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
                </div>
            </div>
        </>
    );
}
