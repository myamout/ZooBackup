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
						- Amount of different types of animals. x
						- Gender differences.
						- Oldest & youngest animals.
						- Tracking animals with bad health. x
					Inventory
					---
						- Highest & lowest amount of food from inventory
						*/
						<div className="dashboard-container">
						<div className="dashboard-stats">
							<div class="stat-group">
								<div class="dashboard-stat bottom-bar">Youngest Animal: Kangaroo</div>
								<div class="dashboard-stat bad-stat">Oldest Animal: Turtle</div>
							</div>
							<div class="stat-group">							
								<div class="dashboard-stat bottom-bar">Stocked up on: Ramen Noodles</div>
								<div class="dashboard-stat bad-stat">Low on: Broccoli</div>
							</div>
						</div>
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
							        ['ID', 'Life Expectancy', 'Age', 'Species','Fertility Rate'],
							        ['Logan',80.66, 2,'Pidgeon',1.75],
							        ['Michael',79.84, 3,'Emu',1.85],
							        ['David',78.6, 2,'Dolphin',1.85],
							        ['Matt',80.05, 1,'Camel',1.85],
							        ['Vaso',78.09, 1.5,'Seal',1.99],
							        ['Arzoo',78.09, 1.75,'Organtan',1.85]

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
									vAxis: {title: 'Age',
								textPosition: 'in'},
									legend:{
										textStyle: {
											color: '#666',
											fontSize: 14
										}
									},
								}}
								graph_id="Life"
								width="100%"
								height="400px"
								legend_toggle
								>
								  </Chart>
							</div>

							<div class="dashboard-chart-container">
								<Chart
								className="dashboard-card"
								chartType="BarChart"
								data={
									[
									        ["Food Type", "Quantity"],
									        ["Kibble", 8],
									        ["Bananas", 13],
									        ["CS532 Students", 21],
									      ]
								}
								options={{
									chartArea: {'width': '100%', 'height': '82%'},
									title:"Food Inventory",
									titleTextStyle: {
									    fontName: "verdana",
									    fontSize: 22,
									    bold:false,
									},
									bubble: {textStyle: {fontSize: 12},stroke:"transparent"},
									hAxis: {title: 'Life Expectancy'},
									vAxis: {textPosition: 'in',stroke:'transparent'},
									legend:{
										textStyle: {
											color: '#666',
											fontSize: 14
										}
									},
								}}
								graph_id="Inventory"
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
