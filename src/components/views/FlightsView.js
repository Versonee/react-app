import axios from "axios";
import React, {Component} from "react";
import '../../css/FlightsView.css';
import Navigation from "../common/Navigation";

let flightsList = [
	{
		"start_port": "Ziemia, Białystok",
		"end_port": "Mars, Stacja B",
		"start_date": "01-01-2020",
		"end_date": "10-10-2020",
		"price": "10.570",
		"seats": "47/60"
	}
];

for (let i = 0; i < 40; i++) {
	flightsList[i + 1] = {
		"start_port": "A",
		"end_port": "B",
		"start_date": "01-01-2020",
		"end_date": "10-10-2020",
		"price": "10.000",
		"seats": "13/20"
	};
}


const FlightsView = (props) => {
	return (
		<>
		<Navigation toggleable={1}/>
		<div className="flights-background">
			<div className="flights-wrapper">
				<div className="flights-filtering">
					<div className="flights-filtering-selectors">
						<select className="flights-selector" name="start-port">
							<option value="">-Wybierz stację startową-</option>
							<option>Ziemia, Białystok</option>
							<option>Mars, Stacja A</option>
							<option>Mars, Stacja B</option>
						</select>
						<select className="flights-selector" name="end-port">
							<option value="">-Wybierz stację końcową-</option>
							<option>Ziemia, Białystok</option>
							<option>Mars, Stacja A</option>
							<option>Mars, Stacja B</option>
						</select>
						<input className="flights-selector" type="date" name="start-date"/>
						<input className="flights-selector" type="date" name="end-date"/>
						<select className="flights-selector" name="flight-price">
							<option value="">-Wybierz przedział cenowy-</option>
							<option>10.000-15.000</option>
							<option>15.000-20.000</option>
							<option>20.000-25.000</option>
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
						flightsList.map((value,index) => {
							return (
								<tr className="flights-row" key={index}>
									<td onClick={()=>props.addCardTrigger(value)} className="outer-cell left"><i className="fas fa-plus-circle"></i></td>
									<td className="info-cell"><div className="flights-table-txt">{value.start_port}</div></td>
									<td className="info-cell"><div className="flights-table-txt">{value.end_port}</div></td>
									<td className="info-cell"><div className="flights-table-txt">{value.start_date}</div></td>
									<td className="info-cell"><div className="flights-table-txt">{value.end_date}</div></td>
									<td className="info-cell"><div className="flights-table-txt">{value.price}</div></td>
									<td className="info-cell">{value.seats}</td>
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

class FlightsView extends Component {

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
			<div class="flights-background">
				<div class="flights-wrapper">
					<div class="flights-filtering">
						<div class="flights-filtering-selectors">
							<select class="flights-selector" name="start-port">
							    <option value="">-Wybierz stację startową-</option>
								{
									this.state.flights.map(flight => {
                             		return <option>{flight.portLink.startingPort.name}</option>})
                       			}
							</select>

							<select class="flights-selector" name="end-port">
							    <option value="">-Wybierz stację końcową-</option>
								{
									this.state.flights.map(flight => {
                             		return <option>{flight.portLink.endPort.name}</option>})
                       			}
							</select>

							<input class="flights-selector" type="date" name="start-date"/>
							<input class="flights-selector" type="date" name="end-date"/>
							<select class="flights-selector" name="flight-price">
								<option value="">-Wybierz przedział cenowy-</option>
								<option>10.000-50.000</option>
								<option>50.000-100.000</option>
								<option>100.000+</option>
							</select>

						</div>
						<button>SZUKAJ</button>
					</div>
					<hr/>
					<div class="flights-list">
						<table class="flights-table" cellSpacing="0">
						<thead>
						<tr class="flights-table-header">
							<td class="outer-cell"></td>
							<td class="info-cell with-border">Stacja startowa</td>
							<td class="info-cell with-border">Stacja końcowa</td>
							<td class="info-cell with-border">Data wylotu</td>
							<td class="info-cell with-border">Data przylotu</td>
							<td class="info-cell with-border">Cena</td>
							<td class="info-cell">Zajęte miejsca</td>
							<td class="outer-cell"></td>
						</tr>
						</thead>
						<tbody>
							
						{
							this.state.flights.map(flight => {
                                return (
                                	<tr class="flights-row" key={flight.id}>
										<td class="outer-cell left"><i class="fas fa-plus-circle"></i></td>
										<td class="info-cell"><div class="flights-table-txt">{flight.portLink.startingPort.name}</div></td>
										<td class="info-cell"><div class="flights-table-txt">{flight.portLink.endPort.name}</div></td>
										<td class="info-cell"><div class="flights-table-txt">{flight.start_date}</div></td>
										<td class="info-cell"><div class="flights-table-txt">{flight.end_date}</div></td>
										<td class="info-cell"><div class="flights-table-txt">{flight.ticketPrice}</div></td>
										<td class="info-cell">{this.state.seats}/{flight.maxSize}</td>
										<td class="outer-cell right"></td>
									</tr>
                                )
                            })
                        }
					
                        </tbody>
                        
						</table>
					</div>
				</div>
				<div class="flights-btns">
					<button class="flights-order">ZAMÓW</button>
					<i class="fas fa-shopping-cart"></i>
				</div>
			</div>
			</>
		)
	}
}

export default FlightsView;
