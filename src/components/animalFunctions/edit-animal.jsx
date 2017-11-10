import React, { Component } from 'react';

export default class EditAnimal extends Component {
    constructor() {
        super();
        this.state = {
            animal: {
                name: '',
                age: 0,
                animal_type: '',
                animal_food: '',
                animal_health: '',
                animal_gender: ''
            },
            canEdit: false,
            name: ''
        };
        this.handleName = this.handleName.bind(this);
        this.handleCanEdit = this.handleCanEdit.bind(this);
        this.handleAnimalName = this.handleAnimalName.bind(this);
        this.handleAnimalAge = this.handleAnimalAge.bind(this);
        this.handleAnimalType = this.handleAnimalType.bind(this);
        this.handleAnimalFood = this.handleAnimalFood.bind(this);
        this.handleAnimalHealth = this.handleAnimalHealth.bind(this);
        this.handleAnimalGender = this.handleAnimalGender.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleName(event) {
        this.setState({
            name: event.target.value
        });
    }

    async handleCanEdit(event) {
        event.preventDefault();
        try {
            let response = await fetch(`/api/exists?name=${this.state.name}`, {
                method: 'get'
            });
            let responseData = await response.json();
            if (responseData.success === true) {
                this.setState({
                    canEdit: true
                });
                this.setState({
                    animal: {
                        name: responseData.animal.name,
                        age: responseData.animal.age,
                        animal_type: responseData.animal.animal_type,
                        animal_food: responseData.animal.animal_food,
                        animal_health: responseData.animal.animal_health,
                        animal_gender: responseData.animal.animal_gender
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleAnimalName(event) {
        this.setState({
            animal: {
                name: event.target.value,
                age: this.state.animal.age,
                animal_type: this.state.animal.animal_type,
                animal_food: this.state.animal.animal_food,
                animal_health: this.state.animal.animal_health,
                animal_gender: this.state.animal.animal_gender
            }
        });
    }

    handleAnimalAge(event) {
        this.setState({
            animal: {
                name: this.state.animal.name,
                age: event.target.value,
                animal_type: this.state.animal.animal_type,
                animal_food: this.state.animal.animal_food,
                animal_health: this.state.animal.animal_health,
                animal_gender: this.state.animal.animal_gender
            }
        });
    }

    handleAnimalType(event) {
        this.setState({
            animal: {
                name: this.state.animal.name,
                age: this.state.animal.age,
                animal_type: event.target.value,
                animal_food: this.state.animal.animal_food,
                animal_health: this.state.animal.animal_health,
                animal_gender: this.state.animal.animal_gender
            }
        });
    }

    handleAnimalFood(event) {
        this.setState({
            animal: {
                name: this.state.animal.name,
                age: this.state.animal.age,
                animal_type: this.state.animal.animal_type,
                animal_food: event.target.value,
                animal_health: this.state.animal.animal_health,
                animal_gender: this.state.animal.animal_gender
            }
        });
    }

    handleAnimalHealth(event) {
        this.setState({
            animal: {
                name: this.state.animal.name,
                age: this.state.animal.age,
                animal_type: this.state.animal.animal_type,
                animal_food: this.state.animal.animal_food,
                animal_health: event.target.value,
                animal_gender: this.state.animal.animal_gender
            }
        });
    }

    handleAnimalGender(event) {
        this.setState({
            animal: {
                name: this.state.animal.name,
                age: this.state.animal.age,
                animal_type: this.state.animal.animal_type,
                animal_food: this.state.animal.animal_food,
                animal_health: this.state.animal.animal_health,
                animal_gender: event.target.value
            }
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.animal);
        const data = JSON.stringify(this.state.animal);
        try {
            let response = await fetch('/api/update', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: data
            });
            let responseData = await response.json();
            this.setState({
                animal: {
                    name: '',
                    age: 0,
                    animal_type: '',
                    animal_food: '',
                    animal_health: '',
                    animal_gender: ''
                }
            });
            this.setState({ canEdit: false });
            this.setState({ name: '' });
        } catch(error) {
            console.log(error);
        }
        
    }

    render() {
        return(
            <div> 
                {!this.state.canEdit ? (
                    <div> 
                        <h2> Enter Animal Name </h2>
                        <input type="text" value={this.state.name} onChange={this.handleName} placeholder="Enter Animal Name" />
                        <button type="button" onClick={this.handleCanEdit}> Edit Animal </button>
                    </div>
                ) : (
                    <div>
                        <input type="text" value={this.state.animal.name} onChange={this.handleAnimalName} placeholder="Enter animal name" />
                        <input type="number" value={this.state.animal.age} onChange={this.handleAnimalAge} placeholder="Enter animal's age" />
                        <input type="text" value={this.state.animal.animal_type} onChange={this.handleAnimalType} placeholder="Enter species" />
                        <input type="text" value={this.state.animal.animal_food} onChange={this.handleAnimalFood} placeholder="Enter animal's food choice" />
                        <input type="text" value={this.state.animal.animal_health} onChange={this.handleAnimalHealth} placeholder="Enter animal's health" />
                        <input type="text" value={this.state.animal.animal_gender} onChange={this.handleAnimalGender} placeholder="Enter animal's sex (M or F)" />
                        <button type="button" onClick={this.handleSubmit}> Edit Animal </button> 
                    </div>
                )}
            </div>
        );
    }
}
