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
									},
									pieSliceTextStyle: {
							          color: 'white',
							          fontName: "verdana"
							        },
									legend:{
										alignment:"center",
										textStyle: {
											color: '#666',
											fontSize: 14
										}
									},
								}}
								graph_id="PieChart"
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
							<div class="dashboard-chart-container">
								<Chart
								className="dashboard-card"
								chartType="BubbleChart"
								data={[
							        ['ID', 'Life Expectancy', 'Fertility Rate', 'Species'],
							        ['Logan',    80.66,              1.67,      'Pidgeon'],
							        ['Michael',    79.84,              1.36,      'Emu'],
							        ['David',    78.6,               1.84,      'Dolphin'],
							        ['Matt',    80.05,              2,         'Camel'],
							        ['Vaso',    78.09,              2.05,      'Seal'],
							        ['Arzoo',    78.09, 2.05,'Organtan']

							      ]
								}
								options={{
									chartArea: {'width': '100%', 'height': '82%'},
									title:"Animal Health",
									titleTextStyle: {
									    fontName: "verdana",
									    fontSize: 22,
									    bold:false,
									},
									bubble: {textStyle: {fontSize: 12},stroke:"transparent"},
									hAxis: {title: 'Life Expectancy'},
									vAxis: {title: 'Fertility Rate'},
									legend:{
										alignment:"center",
										textStyle: {
											color: '#666',
											fontSize: 14
										}
									},
								}}
								graph_id="AnimalSex"
								width="100%"
								height="400px"
								legend_toggle
								>
								  </Chart>
							</div>

					
					</div>
					);
	}

}
