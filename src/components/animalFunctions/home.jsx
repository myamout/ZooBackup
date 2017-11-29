import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import Modal from './modal.jsx';

export default class Home extends Component {

	constructor() {
        super();
        this.state = {
            animals: [],
            BubbleChartArray: [],
            AnimalCountArray: [],
            isModalOpen: false
        };
        this.handleGetAllAnimals();

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

	async handleGetAllAnimals() {
        try {
        	let images = [
			  { img: "../../media/monkey.jpg"},
			  { img: "../../media/giraffe.jpeg" },
			  { img: "../../media/panda.jpeg" },
			  { img: "../../media/tiger.jpg" }
			];
            let response = await fetch('/api/allAnimals', {
                method: 'get'
            });
            let i = 0;
            let responseData = await response.json();
            let allAnimals = responseData.animals;
            let stateArray = [];
            let ChartArray = [];
            let CountArray = [];

            // ['Elephants',  5]
            CountArray[0] = ['Task', 'Hours per Day'];
            CountArray[1] = ['Tigers',  0];
            CountArray[2] = ['Grey Wolves',  0];
            CountArray[3] = ['Elephants',  0];
            CountArray[4] = ['Racoons',  0];
            CountArray[5] = ['Alligators',  0];
            CountArray[6] = ['Hippopotami',  0];
            CountArray[7] = ['Monkeys',  0];
            CountArray[8] = ['Giraffes',  0];

            ChartArray[0] = ['ID', 'Health', 'Age', 'Species'];
            allAnimals.forEach((animal) => {
            	console.log(animal._source.name + animal._source.animal_type + animal._source.animal_health);
                let animalArray = [animal._source.name, animal._source.animal_health, animal._source.age, animal._source.animal_type];
                ChartArray.push(animalArray);


                if(animal._source.animal_type == 'Tiger'){
                    console.log('test');
                    CountArray[1][1]++;
                }
                if(animal._source.animal_type == 'Grey Wolf'){
                    CountArray[2][1]++;
                }
                if(animal._source.animal_type == 'Elephant'){
                    CountArray[3][1]++;
                }
                if(animal._source.animal_type == 'Racoon'){
                    CountArray[4][1]++;
                }
                if(animal._source.animal_type == 'Alligator'){
                    CountArray[5][1]++;
                }
                if(animal._source.animal_type == 'Hippopotamus'){
                    CountArray[6][1]++;
                }
                if(animal._source.animal_type == 'Monkey'){
                    CountArray[7][1]++;
                }
                if(animal._source.animal_type == 'Giraffe'){
                    CountArray[8][1]++;
                }


                animal._source.image = images[i].img;
                stateArray.push(animal._source);
                i++;
            });

            console.log(CountArray[0]);
            console.log(CountArray[1]);


            // ,
            // ['Logan',80.66, 2,'Pidgeon',1.75],

            this.setState({
                animals: stateArray,
                BubbleChartArray: ChartArray,
                AnimalCountArray: CountArray
            });
        } catch (error) {
            console.log(error);
        }
    }

     openModal(currentAnimal, currentAnimalAge, currentAnimalType, currentAnimalHealth, currentAnimalFood, currentAnimalGender) {
		// console.log(animal);
      this.setState({ isModalOpen: true,
      currentAnimal,
      currentAnimalAge,
      currentAnimalType,
      currentAnimalHealth,
      currentAnimalFood,
      currentAnimalGender,
       })
    }

    closeModal() {
      this.setState({ isModalOpen: false })
    }

	// Just renders a h1 tag to the page
	render() {

		var animalCards = this.state.animals.map(function(animal) {
	      return (
	        <div className="card animal-card">
			  <div className="card-body">
			  	<img className="card-img-top animal-img" src={animal.image} />
			    <h4 className="card-title">{animal.name}</h4>
			    <p className="card-text">Age: {animal.age}</p>
			    <div onClick={this.openModal.bind(this, animal.name, animal.age, animal.animal_type, animal.animal_health, animal.animal_food, animal.animal_gender)} className="btn btn-primary">Animal Info.</div>
			  </div>
			</div>
	      );
	    }.bind(this));


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
								<div class="dashboard-stat bottom-bar">Youngest Animal: Monkey</div>
								<div class="dashboard-stat bad-stat">Oldest Animal: Elephant</div>
							</div>
							<div class="stat-group">
								<div class="dashboard-stat bottom-bar">Stocked up on:  Beef</div>
								<div class="dashboard-stat bad-stat">Low on: Berries</div>
							</div>
						</div>
							<div class="dashboard-chart-container">
								<Chart
								className="dashboard-card"
								chartType="PieChart"
								data={
                                this.state.AnimalCountArray
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
								data={
                                this.state.BubbleChartArray
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
									        ["Beef", 120],
									        ["Grass", 50],
									        ["Berries", 15],
                                            ["Deer", 20],
                                            ["Nuts", 20],
                                            ["Bananas", 45],
                                            ["Leaves", 80],

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
									hAxis: {title: 'Food Quanity'},
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

							 <div className="largeFlexContainer">
					       	{animalCards}
					 		</div>

				          <Modal isOpen={this.state.isModalOpen} onClose={this.closeModal}>
				            <h1>Name: {this.state.currentAnimal}</h1>
				            <p>Age: {this.state.currentAnimalAge}</p>
				            <p>Type: {this.state.currentAnimalType}</p>
				            <p>Health: {this.state.currentAnimalHealth}</p>
				            <p>Food: {this.state.currentAnimalFood}</p>
				            <p>Gender: {this.state.currentAnimalGender}</p>
				            <p><button onClick={this.closeModal}>Close</button></p>
				          </Modal>

					</div>
					);
	}

}
