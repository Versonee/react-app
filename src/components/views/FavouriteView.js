import Navigation from "../common/Navigation";
import React, {Component} from "react";
import '../../css/Favourite.css';


const FavouriteView = () => {

    return(
        <>
            <Navigation toggleable={0}/>
            <div className="fav-background">
                <div className="footer">
                    <div className="footer-text">Lot w Kosmos, ul. Wiejska 45A, 15-351 Białystok</div>
                </div>
            </div>
        </>
    );

}
export default FavouriteView;