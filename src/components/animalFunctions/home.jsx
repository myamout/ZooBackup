import React, { Component } from 'react';
import Modal from './modal.jsx';

export default class Home extends Component {

	constructor() {
        super();
        this.state = {
            animals: [],
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
            allAnimals.forEach((animal) => {
            	// console.log(images[0]);
            	animal._source.image = images[i].img;
                stateArray.push(animal._source);
                i++;
            });
            this.setState({
                animals: stateArray
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

    // renders animal cards
    render() {
	 	var animalCards = this.state.animals.map(function(animal) {
	      return (
	        <div className="card animal-card">
			  <div className="card-body">
			  	<img className="card-img-top animal-img" src={animal.image} />
			    <h4 className="card-title">{animal.name}</h4>
			    <p className="card-text">Age: {animal.age}</p>
			    {/*<div hidden>{animal.type} {animal.health} {animal.type} {animal.type}</div>*/}
			    <div onClick={this.openModal.bind(this, animal.name, animal.age, animal.animal_type, animal.animal_health, animal.animal_food, animal.animal_gender)} className="btn btn-primary">Animal Info.</div>
			  </div>
			</div>
	      );
	    }.bind(this));
  
        return(
		    
		    <div>

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

	




