import React, {Component} from "react";
import '../css/style.css'
import Navigation from "./Navigation";
class PlanetView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            status : 1,
        }
    }

    render(){
        return(
            <>
                <Navigation/>
                <div className="planet-view">
                </div>
            </>
        );
    }

}
export default PlanetView;