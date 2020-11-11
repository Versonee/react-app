import React, {Component} from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainView from "./components/MainView";
import PlanetView from "./components/PlanetView";
import FlightsView from "./components/FlightsView";
import './css/style.css'

class App extends Component{
    render(){
        return(
            <Router>
                <Route exact path="/" render={()=><MainView/>}/>
                <Route exact path="/planets" render={()=><PlanetView/>}/>
                <Route exact path="/flights" render={()=><FlightsView/>}/>
            </Router>
        );
    }
}
export default App;