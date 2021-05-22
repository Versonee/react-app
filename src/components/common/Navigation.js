import React, {Component} from "react";
import {ReactComponent as PlanetIcon} from "../../images/planet.svg";
import {ReactComponent as HomeIcon} from "../../images/home.svg";
import {ReactComponent as ProfileIcon} from "../../images/profile.svg";
import {ReactComponent as ToggleIcon} from "../../images/toggle.svg";
import {ReactComponent as FlightIcon} from "../../images/flight.svg";
import {ReactComponent as LogoutIcon} from "../../images/logout.svg";
import {Link} from "react-router-dom";


class Navigation extends Component{
    constructor(props) {
        super(props);
        var user = window.sessionStorage.getItem("user");
        user = JSON.parse(user);
        var isUserLogged = false;
        if (!(user === null || user === "")) {
            isUserLogged = true;
        }
        this.state={
            toggle:true,
            toggleable: !!this.props.toggleable,
            isUserLogged: isUserLogged,
        }
    }
    toggleMenu = () =>{
        let prevState = this.state;
        prevState.toggle = !prevState.toggle;
        return this.setState(prevState);
    }
    logoutUser = () => {
        window.sessionStorage.removeItem("user");
        window.localStorage.setItem("shopping-card-list", "[]");
        window.location.href = "/";
    }
    render(){
        return(
            <div className={"navbar toggle-"+this.state.toggle}>
                <div className="nav-container">
                    <div className="nav-items">
                        <Link to="/"><div className="nav-item"><HomeIcon/></div></Link>
                        <Link to="/planets"><div className="nav-item"><PlanetIcon/></div></Link>
                        <Link to="/profile"><div className="nav-item"><ProfileIcon/></div></Link>
                        <Link to="/flights"><div className="nav-item"><FlightIcon/></div></Link>
                        {this.state.isUserLogged?<Link to={"/"}><div className="nav-item" onClick={this.logoutUser}><LogoutIcon/></div></Link>:''}
                    </div>
                </div>
                {this.state.toggleable ?
                    <div className="toggle-button" onClick={this.toggleMenu}><ToggleIcon className={"toggle-icon toggle-"+this.state.toggle}/></div>:''
                }

            </div>

        );
    }
}
export default Navigation;
