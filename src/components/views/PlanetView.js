import Navigation from "../common/Navigation";
import React, {useState, useEffect} from "react";
import axios from "axios";

const PlanetView  = props =>{
    const [planet, setPlanet] = useState(null);
    const [planetList, setPlanetList] = useState(null)
    const onClick = (e)=>{
        setPlanet(planetList[e.target.getAttribute("data-index")-1]);
    }
    useEffect(()=>{
        let url = 'https://bakent.herokuapp.com/planets';
        let headers =  {
            "Access-Control-Allow-Origin":"*",
            "Content-Type":"application/json"
        }
        axios.get(url,headers)
            .then(res => {
                if(res.data){
                    setPlanetList(res.data)
                    console.log(res);
                }
            });
    },[])

    const removeCurrentPlanet=()=> {
        setPlanet(null);
    }

    return(
        <>
            {planetList?
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
                                    return <div  key={index+"planet"} className={"planet"} >
                                        <div className={"planet-label"}>{value.name}</div>
                                        <div data-index={value.id} className={"scale-planet planet-"+ value.name} onClick={onClick}></div>
                                    </div>
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
                        {planet?
                            <div className="planet-info-panel">
                                <div className="close-info-panel" onClick={removeCurrentPlanet}>+</div>
                                <div className="info-planet-name">{planet.name}</div>
                                <div className="info-planet-discovery">{planet.description}</div>
                                <div className="info-planet-orbit">Odległość od słońca: {planet.distanceFromTheSun} km</div>
                            </div>
                            :""
                        }
                    </div>
                </>:""
            }


        </>
    );


}
export default PlanetView;
