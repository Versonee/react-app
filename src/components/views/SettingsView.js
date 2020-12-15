import Navigation from "../common/Navigation";
import React, {Component} from "react";

class SettingsView extends Component{
    render(){
        return(
            <>
                <Navigation toggleable={0}/>
                <div className="settings-view">
                    settings
                </div>
            </>
        );
    }

}
export default SettingsView;
