import axios from "axios";
import React, {Component} from "react";
import '../../css/FlightsView.css';
import Navigation from "../common/Navigation";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";

let startPorts = new Set();
let endPorts = new Set();
let tmpPorts = [];
export default class FlightsView extends Component {
    state = {
        flights: [],
        filteredFlights: [],
        seats: 0
    }

    thereIsNoFreeSeats(flight) {
        var currentlyTakenSeats = parseInt(document.getElementById(flight.id + "taken-seats").innerText);
        return currentlyTakenSeats === flight.maxSize;
    }

    handleClick = (startPlanet, endPlanet, flight) => {
        let message = "Dodano do koszyka lot z " + startPlanet + " do " + endPlanet;
        if (!this.props.userExists) {
            message = "Aby dodać produkt do koszyka musisz się zalogować!"
        } else if (this.thereIsNoFreeSeats(flight)) {
            message = "W tym locie nie ma już wolnych miejsc!"
        } else {
            this.props.addCardTrigger(flight);
        }
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

    //http://bakent.herokuapp.com/flights/Wenusolab/Zeusa/0/1500000/2020-04-17/2039-04-17
    componentDidMount() {
        axios.get("https://bakent.herokuapp.com/flights")
            .then(res => {
                this.setState({
                    flights: res.data,
                    filteredFlights: res.data
                })
            });
    }

    getDivId(id) {
        return id + "taken-seats";
    }

    getNumberOfTakenSeats(id) {
        axios.get("https://bakent.herokuapp.com/tickets/flight/" + id + "/count")
            .then(res => {
                document.getElementById(id + "taken-seats").innerText = res.data;
            });
    }

    render() {
        const notifyFlightFound = (x) => toast.dark('‍✈️Znaleziono ' + x + ' lotów spełniające Twoje kryteria.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        const notifyFlightNotFound = () => toast.error('💥 Brak lotów o tych kryteriach, powrót do głównej listy lotów', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return (
            <>
                <Navigation toggleable={1}/>
                <div className="flights-background">
                    <div className="flights-wrapper">
                        <div className="flights-filtering">
                            <div className="flights-filtering-selectors">
                                <select id="startingPort" className="flights-selector" name="start-port">
                                    <option hidden value="">Wybierz stację startową</option>
                                    {
                                        this.state.flights.map((flight, index) => {
                                            console.log("jestem tu w mapie " + this.state.flights.length)
                                            if (!startPorts.has(flight.portLink.startingPort.name)) {
                                                startPorts.add(flight.portLink.startingPort.name);
                                                return <option
                                                    key={"start-port-" + index}>{flight.portLink.startingPort.name}</option>
                                            }
                                        })
                                    }
                                </select>

                                <select id="endingPort" className="flights-selector" name="end-port">
                                    <option hidden value="">Wybierz stację końcową</option>
                                    {
                                        this.state.flights.map((flight, index) => {
                                            if (!endPorts.has(flight.portLink.endPort.name)) {
                                                endPorts.add(flight.portLink.endPort.name);
                                                return <option
                                                    key={"end-port-" + index}>{flight.portLink.endPort.name}</option>
                                            }
                                        })
                                    }
                                </select>
                                <input defaultValue="2021-01-01" id="startDate" className="flights-selector" type="date"
                                       name="start-date"/>
                                <input defaultValue="2040-01-01" id="endDate" className="flights-selector" type="date"
                                       name="end-date"/>
                                <select className="flights-selector" name="flight-price" id="fromPrice">
                                    <option hidden value="0">Od</option>
                                    <option value="0">0</option>
                                    <option value="50000">50000</option>
                                    <option value="100000">100000</option>
                                    <option value="200000">200000</option>
                                </select>
                                <select className="flights-selector" name="flight-price" id="toPrice">
                                    <option hidden value="15000000">Do</option>
                                    <option value="50000">50000</option>
                                    <option value="100000">100000</option>
                                    <option value="500000">500000</option>
                                    <option value="15000000">500000+</option>
                                </select>

                            </div>
                            <button onClick={() =>
                                axios.get(`https://bakent.herokuapp.com/flights`)
                                    .then(res => {
                                        startPorts = new Set();
                                        endPorts = new Set();
                                        this.setState({
                                            filteredFlights: res.data.filter(value =>
                                                value.portLink.startingPort.name.startsWith(document.getElementById("startingPort").value) &&
                                                value.portLink.endPort.name.startsWith(document.getElementById("endingPort").value) &&
                                                value.start_date >= document.getElementById("startDate").value &&
                                                value.end_date <= document.getElementById("endDate").value &&
                                                value.ticketPrice >= document.getElementById("fromPrice").value &&
                                                value.ticketPrice <= document.getElementById("toPrice").value
                                            ),
                                        })
                                        if(this.state.filteredFlights.length === 0){
                                            notifyFlightNotFound();
                                            startPorts = new Set();
                                            endPorts = new Set();
                                            this.setState({
                                                filteredFlights: res.data,
                                            })
                                        } else {
                                            notifyFlightFound(this.state.filteredFlights.length);
                                        }
                                    })
                            }>
                                SZUKAJ
                            </button>
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
                                    <td className="outer-cell"/>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                        this.state.filteredFlights.map(flight => {
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
                                                    <td className="info-cell">
                                                        <div id={this.getDivId(flight.id)}
                                                             style={{display: "inline-block"}}></div>
                                                        {this.getNumberOfTakenSeats(flight.id)}/{flight.maxSize}</td>
                                                    <td className="outer-cell right"/>
                                                </tr>
                                            )
                                        })
                                }
                                </tbody>
                            </table>

                        </div>
                    </div>
                    <div className="flights-btns">
                        <div onClick={() => window.location.href = "/profile"}>
                            <i className="fas fa-shopping-cart"></i>
                        </div>
                    </div>
                </div>
                <ToastContainer/>
            </>
        )
    }
}

