import Navigation from "../common/Navigation";
import React, {Component} from "react";

class FavouriteView extends Component{
    render(){
        return(
            <>
                <Navigation toggleable={0}/>
                <div className="favourite-view">
                    favourite
                </div>
            </>
        );
    }

}
export default FavouriteView;
