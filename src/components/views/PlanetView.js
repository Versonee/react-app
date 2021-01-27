import React, {Component} from "react";
import Navigation from "../common/Navigation";
const planetList = [
    {
        name:"mercury",
        discovery:"Known to the ancient Greeks and visible to the naked eye",
        nameOrigin: "Named after the messenger of the Roman gods",
        diameter: "3,031 miles (4,878 km)",
        orbit: "88 Earth days",
        day: "58.6 Earth days",
    },
    {
        name:"venus",
        discovery:"Known to the ancient Greeks and visible to the naked eye",
        nameOrigin: "Named after the Roman goddess of love and beauty",
        diameter: "7,521 miles (12,104 km)",
        orbit: "225 Earth days",
        day: "241 Earth days",
    },
    {
        name:"earth",
        discovery:"We are here!",
        nameOrigin: "Name originates from \"Die Erde,\" the German word for \"the ground.\"",
        diameter: "7,926 miles (12,760 km)",
        orbit: "365.24 days",
        day: "23 hours, 56 minutes",
    },
    {
        name:"mars",
        discovery:"Known to the ancient Greeks and visible to the naked eye",
        nameOrigin: "Name originates from \"Die Erde,\" the German word for \"the ground.\"",
        diameter: "4,217 miles (6,787 km)",
        orbit: "687 Earth days",
        day: "24 hours, 37 minutes",
    },
    {
        name:"jupiter",
        discovery:"Known to the ancient Greeks and visible to the naked eye",
        nameOrigin: "Named after the ruler of the Roman gods",
        diameter: "86,881 miles (139,822 km)",
        orbit: "11.9 Earth years",
        day: "9.8 Earth hours",
    },
    {
        name:"saturn",
        discovery:"Known to the ancient Greeks and visible to the naked eye",
        nameOrigin: "Named after Roman god of agriculture",
        diameter: "74,900 miles (120,500 km)",
        orbit: "29.5 Earth years",
        day: "10.5 Earth hours",
    },
    {
        name:"uranus",
        discovery:"Discovered in 1781 by William Herschel (was originally thought to be a star)",
        nameOrigin: "Named after the personification of heaven in ancient myth",
        diameter: "31,763 miles (51,120 km)",
        orbit: "84 Earth years",
        day: "18 Earth hours",
    },
    {
        name:"neptun",
        discovery:"Discovered in 1846",
        nameOrigin: "Named after the Roman god of water",
        diameter: "30,775 miles (49,530 km)",
        orbit: "165 Earth years",
        day: "19 Earth hours",
    },
    ]
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
                <Navigation toggleable={1}/>
                <div className="planets-view">
                    <div className="planets-panel">
                        <div className="planets-container">
                            <div className="star sun">
                                {planetList.map((value,index)=>{
                                    return <div key={index+"orbit"} className="orbit"></div>
                                })}
                            </div>
                            {planetList.map((value,index)=>{
                                return <div key={index+"planet"} className={"planet planet-"+ value.name}></div>
                            })}
                        </div>
                    </div>
                    <div className="footer">
                        <div className="footer-text">
                            <div className="p_f_text" >
                                Lot w Kosmos, ul. Wiejska 45A, 15-351 Białystok
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }

}
export default PlanetView;
