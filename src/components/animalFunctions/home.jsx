import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

export default class Home extends Component {

	// Just renders a h1 tag to the page
	render() {
		return(
			/*
				Dashboard reports:
				----
					Animals
					---
						- Amount of different types of animals.
						- Gender differences.
						- Oldest & youngest animals.
						- Tracking animals with bad health.
					Inventory
					---
						- Highest & lowest amount of food from inventory
						*/
						<div className="dashboard-container">
							<div class="dashboard-chart-container">
								<Chart
								className="dashboard-card"
								chartType="PieChart"
								data={[['Task', 'Hours per Day'],
								['Pandas',     11],
								['Camels',      2],
								['Penguins',  2],
								['Logans', 2],
								['Davids',    7]]
								}
								options={{
								pieHole: 0.1,
								pieSliceTextStyle: {
								color: 'black',
								},
								title:"Zoo Animals",
								chartArea: {'width': '100%', 'height': '80%'},
								}}
								graph_id="OtherPieChart"
								width="100%"
								height="300px"
								margin="8px"
								legend_toggle
								/>
							</div>
					
					</div>
					);
	}

}
