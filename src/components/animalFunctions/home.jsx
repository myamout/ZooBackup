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
									pieHole: 0.5,
									pieSliceTextStyle: {
									color: 'black',
									},
									chartArea: {'width': '100%', 'height': '82%'},
									pieSliceBorderColor: "none",
									titleTextStyle: {
									    color: "#424242",
									    fontName: "verdana",
									    fontSize: 22,
									}
								}}
								graph_id="OtherPieChart"
								width="100%"
								height="400px"
								legend_toggle
								>
								  </Chart>
								  <div className="chart-center">
									  <span class="chart-center-title">
									  	Animals
									  </span>
									  <span class="chart-center-subtitle">
									  	Currently at the Zoo
									  </span>
								  </div>
							</div>
					
					</div>
					);
	}

}
