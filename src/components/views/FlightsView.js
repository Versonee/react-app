import axios from "axios";
import React, {Component} from "react";
import '../../css/FlightsView.css';
import Navigation from "../common/Navigation";

export default class FlightsView extends Component {
	state = {
		flights: [],
		seats: 0
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
									this.state.flights.map((flight,index) => {
                             		return <option key={"start-port-"+index}>{flight.portLink.startingPort.name}</option>})
                       			}
							</select>

							<select className="flights-selector" name="end-port">
							    <option value="">-Wybierz stację końcową-</option>
								{
									this.state.flights.map((flight,index) => {
                             		return <option key={"end-port-"+index}>{flight.portLink.endPort.name}</option>})
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
							<td className="outer-cell"></td>
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
                                	<tr className="flights-row" key={"flight-"+flight.id}>
										<td onClick={()=>this.props.addCardTrigger(flight)} className="outer-cell left"><i className="fas fa-plus-circle"></i></td>
										<td className="info-cell"><div className="flights-table-txt">{flight.portLink.startingPort.name}</div></td>
										<td className="info-cell"><div className="flights-table-txt">{flight.portLink.endPort.name}</div></td>
										<td className="info-cell"><div className="flights-table-txt">{flight.start_date}</div></td>
										<td className="info-cell"><div className="flights-table-txt">{flight.end_date}</div></td>
										<td className="info-cell"><div className="flights-table-txt">{flight.ticketPrice}</div></td>
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
			</>
		)
	}
}
