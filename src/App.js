import React, {useState} from "react";
import {BrowserRouter as Router, Route } from 'react-router-dom';
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



export default function App() {
    const [user, setUserState] = useState(null);
    const updateUser = (data) => {
        setUserState(new User(
            data.login,
            data.password,
            data.sex,
            data.firstName,
            data.lastName,
            data.date_of_birth
        ));
    }


    return(
        <Router>
            <Route exact path="/" render={()=><MainView/>}/>
            <Route exact path="/planets" render={()=><PlanetView/>}/>
            <Route exact path="/flights" render={()=><FlightsView/>}/>
            <Route exact path="/profile" render={()=><ProfileView user={user}/>}/>
            <Route exact path="/settings" render={()=><SettingsView/>}/>
            <Route exact path="/favourite" render={()=><FavouriteView/>}/>
            <Route exact path="/login" render={()=><LoginView updateUser={updateUser}/>}/>
            <Route exact path="/register" render={()=><RegisterView/>}/>
        </Router>
    );



}
