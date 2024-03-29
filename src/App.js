import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MainView from "./components/views/MainView";
import PlanetView from "./components/views/PlanetView";
import FlightsView from "./components/views/FlightsView";
import './css/style.css'
import ProfileView from "./components/views/ProfileView";
import SettingsView from "./components/views/SettingsView";
import FavouriteView from "./components/views/FavouriteView";
import LoginView from "./components/views/LoginView";
import RegisterView from "./components/views/RegisterView";
import User from "./User";
import PaymentView from "./components/views/PaymentView";

export default function App() {
    const [user, setUserState] = useState(JSON.parse(window.sessionStorage.getItem("user")) || '');
    const [shopList,setShopList] = useState(JSON.parse(window.localStorage.getItem("shopping-card-list")) || []);

    const updateUser =  (data) => {
        setUserState(new User(
            data.id,
            data.login,
            data.password,
            data.sex,
            data.firstName,
            data.lastName,
            data.date_of_birth
        ));
    }
    useEffect(()=>{
        window.sessionStorage.setItem("user",JSON.stringify(user));
    })
    const addToCart = (item) => {
        if(!user) {
            console.log(1);
            return;
        }
        let newShopList = shopList;
        newShopList.push(item);
        setShopList(newShopList);
        window.localStorage.setItem("shopping-card-list",JSON.stringify([...newShopList]));
    }

    const updateCart = (list) =>{
        setShopList(list);
        console.log(list);
        window.localStorage.setItem("shopping-card-list",JSON.stringify([...shopList]));
    }
    const removeFromCart = (items) => {
        // let newShopList = shopList;
        // newShopList.splice(newShopList.indexOf(item), 1);
        // console.log(newShopList);
        setShopList(items);
        window.localStorage.setItem("shopping-card-list",JSON.stringify([...items]));
    }
    return(
        <Router>
            <Route exact path="/" render={()=><MainView/>}/>
            <Route exact path="/planets" render={()=><PlanetView/>}/>
            <Route exact path="/flights" render={()=><FlightsView addCardTrigger={addToCart} userExists={!!user}/>}/>
            <Route exact path="/profile" render={()=><ProfileView user={user} removeTrigger={removeFromCart} shopList={shopList}/>}/>
            <Route exact path="/settings" render={()=><SettingsView/>}/>
            <Route exact path="/payment" render={()=><PaymentView updateShopList={updateCart} shopList={shopList}/>}/>
            <Route exact path="/favourite" render={()=><FavouriteView/>}/>
            <Route exact path="/login" render={()=><LoginView updateUser={updateUser}/>}/>
            <Route exact path="/register" render={()=><RegisterView/>}/>
        </Router>
    );
}
