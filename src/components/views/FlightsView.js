import axios from "axios";
import React, {Component} from "react";
import '../../css/FlightsView.css';
import Navigation from "../common/Navigation";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";


export default class FlightsView extends Component {
    state = {
        flights: [],
        seats: 0
    }

    handleClick = (startPlanet, endPlanet, flight) =>{
        let message="Dodano do koszyka lot z " + startPlanet + " do " + endPlanet;
        if(!this.props.userExists) {message = "Aby dodać produkt do koszyka musisz się zalogować!"}
        else{this.props.addCardTrigger(flight);}

        toast.success(message, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "my-toast",
        });

    }

    componentDidMount() {
        axios.get("https://bakent.herokuapp.com/flights")
            .then(res => {
                this.setState({
                    flights: res.data
                })
            });
    }

    render() {
        return (
            <>
                <Navigation toggleable={1}/>
                <div className="flights-background">
                    <div className="flights-wrapper">
                        <div className="flights-filtering">
                            <div className="flights-filtering-selectors">
                                <select className="flights-selector" name="start-port">
                                    <option value="">-Wybierz stację startową-</option>
                                    {
                                        this.state.flights.map((flight, index) => {
                                            return <option
                                                key={"start-port-" + index}>{flight.portLink.startingPort.name}</option>
                                        })
                                    }
                                </select>

                                <select className="flights-selector" name="end-port">
                                    <option value="">-Wybierz stację końcową-</option>
                                    {
                                        this.state.flights.map((flight, index) => {
                                            return <option
                                                key={"end-port-" + index}>{flight.portLink.endPort.name}</option>
                                        })
                                    }
                                </select>

                                <input className="flights-selector" type="date" name="start-date"/>
                                <input className="flights-selector" type="date" name="end-date"/>
                                <select className="flights-selector" name="flight-price">
                                    <option value="">-Wybierz przedział cenowy-</option>
                                    <option>10.000-50.000</option>
                                    <option>50.000-100.000</option>
                                    <option>100.000+</option>
                                </select>

                            </div>
                            <button>SZUKAJ</button>
                        </div>
                        <hr/>
                        <div className="flights-list">
                            <table className="flights-table" cellSpacing="0">
                                <thead>
                                <tr className="flights-table-header">
                                    <td className="outer-cell"/>
                                    <td className="info-cell with-border">Stacja startowa</td>
                                    <td className="info-cell with-border">Stacja końcowa</td>
                                    <td className="info-cell with-border">Data wylotu</td>
                                    <td className="info-cell with-border">Data przylotu</td>
                                    <td className="info-cell with-border">Cena</td>
                                    <td className="info-cell">Zajęte miejsca</td>
                                    <td className="outer-cell"></td>
                                </tr>
                                </thead>
                                <tbody>

                                {
                                    this.state.flights.map(flight => {
                                        return (
                                            <tr className="flights-row" key={"flight-" + flight.id}>
                                                <td onClick={() => {
                                                    this.handleClick(flight.portLink.startingPort.planet.name, flight.portLink.endPort.planet.name, flight);
                                                }}
                                                    className="outer-cell left"><i className="fas fa-plus-circle"/>
                                                </td>
                                                <td className="info-cell">
                                                    <div
                                                        className="flights-table-txt">{flight.portLink.startingPort.planet.name}, {flight.portLink.startingPort.name}</div>
                                                </td>
                                                <td className="info-cell">
                                                    <div
                                                        className="flights-table-txt">{flight.portLink.endPort.planet.name}, {flight.portLink.endPort.name}</div>
                                                </td>
                                                <td className="info-cell">
                                                    <div className="flights-table-txt">{flight.start_date}</div>
                                                </td>
                                                <td className="info-cell">
                                                    <div className="flights-table-txt">{flight.end_date}</div>
                                                </td>
                                                <td className="info-cell">
                                                    <div className="flights-table-txt">{flight.ticketPrice}</div>
                                                </td>
                                                <td className="info-cell">{this.state.seats}/{flight.maxSize}</td>
                                                <td className="outer-cell right"></td>
                                            </tr>
                                        )
                                    })
                                }

                                </tbody>

                            </table>
                        </div>
                    </div>
                    <div className="flights-btns">
                        <button className="flights-order">ZAMÓW</button>
                        <i className="fas fa-shopping-cart"></i>
                    </div>
                </div>
                <ToastContainer/>
            </>
        )
    }
}


