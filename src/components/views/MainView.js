import React from "react";
import '../../css/MainView.css';
import Navigation from "../common/Navigation";
import {useHistory} from "react-router";

const MainView = () => {
    const history = useHistory();
    const handleClick = ()=>{
        history.push('/planets');
    }
    return (
        <>
            <Navigation toggleable={0}/>
            <div className="wrapper">
                <div className="nav">
                    <div className="logo">LWK</div>

                </div>
                <div className="header-text">
                    <h1>Lot w Kosmos</h1>
                    <p>Nowy wymiar podróży.</p>
                    <button onClick={()=>handleClick()} type="button">WIĘCEJ</button>
                </div>
                <div className="footer">
                    <div className="footer-text">Lot w Kosmos, ul. Wiejska 45A, 15-351 Białystok</div>
                </div>
            </div>
        </>

    );
}

export default MainView;
