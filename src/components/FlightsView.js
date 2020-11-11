import React, {Component} from "react";
import '../css/FlightsView.css';
import Navigation from "./Navigation";

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

class FlightsView extends Component {
	render() {
		return (
			<>
			<Navigation toggleable={1}/>
			<div class="flights-background">
				<div class="flights-wrapper">
					<div class="flights-filtering">
						<div class="flights-filtering-selectors">
							<select name="start-port">
							    <option value="">-Wybierz stację startową-</option>
							    <option>Ziemia, Białystok</option>
							    <option>Mars, Stacja A</option>
							    <option>Mars, Stacja B</option>
							</select>
							<select name="end-port">
							    <option value="">-Wybierz stację końcową-</option>
							    <option>Ziemia, Białystok</option>
							    <option>Mars, Stacja A</option>
							    <option>Mars, Stacja B</option>
							</select>
							<input type="date" name="start-date"/>
							<input type="date" name="end-date"/>
							<select name="flight-price">
								<option value="">-Wybierz przedział cenowy-</option>
								<option>10.000-15.000</option>
								<option>15.000-20.000</option>
								<option>20.000-25.000</option>
							</select>
						</div>
						<button>SZUKAJ</button>
					</div>
					<div class="flights-list">
						<table class="flights-table" cellspacing="0">
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

						{
							flightsList.map((value,index) => {
                                return (
                                	<tr class="flights-row">
										<td class="outer-cell left"><i class="fas fa-plus-circle"></i></td>
										<td class="info-cell">{value.start_port}</td>
										<td class="info-cell">{value.end_port}</td>
										<td class="info-cell">{value.start_date}</td>
										<td class="info-cell">{value.end_date}</td>
										<td class="info-cell">{value.price}</td>
										<td class="info-cell">{value.seats}</td>
										<td class="outer-cell right"></td>
									</tr>
                                )
                            })
                        }
                        
						</table>
					</div>
				</div>
				<button class="flights-order">ZAMÓW</button>
			</div>
			</>
		)
	}
}

export default FlightsView;