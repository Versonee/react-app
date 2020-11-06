import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainView from "./MainView";
import React, {Component} from "react";
import PlanetView from "./components/PlanetView";

class App extends Component{

    render(){
        return(
            <Router>
                <Route exact path="/" render={()=><MainView/>}/>
                <Route exact path="/planets" render={()=><PlanetView/>}/>
            </Router>
        );
    }
}
export default App;