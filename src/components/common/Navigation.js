import React, {Component} from "react";
import {ReactComponent as SettingsIcon} from "../../images/settings.svg";
import {ReactComponent as PlanetIcon} from "../../images/planet.svg";
import {ReactComponent as HomeIcon} from "../../images/home.svg";
import {ReactComponent as FavouriteIcon} from "../../images/favourite.svg";
import {ReactComponent as ProfileIcon} from "../../images/profile.svg";
import {ReactComponent as ToggleIcon} from "../../images/toggle.svg";
import {Link} from "react-router-dom";


class Navigation extends Component{
    constructor(props) {
        super(props);
        this.state={
            toggle:true,
            toggleable: !!this.props.toggleable,
        }
    }
    toggleMenu = () =>{
        let prevState = this.state;
        prevState.toggle = !prevState.toggle;
        return this.setState(prevState);
    }
    render(){
        return(
            <div className={"navbar toggle-"+this.state.toggle}>
                <div className="nav-container">
                    <div className="nav-items">
                        <Link to="/"><div className="nav-item"><HomeIcon/></div></Link>
                        <Link to="/planets"><div className="nav-item"><PlanetIcon/></div></Link>
                        <Link to="/favourite"><div className="nav-item"><FavouriteIcon/></div></Link>
                        <Link to="/profile"><div className="nav-item"><ProfileIcon/></div></Link>
                        <Link to="/settings"><div className="nav-item"><SettingsIcon/></div></Link>
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
