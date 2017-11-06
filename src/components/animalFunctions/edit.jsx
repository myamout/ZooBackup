import React, { Component } from 'react';

export default class Edit extends Component {

    constructor() {
        super();
        this.state = {
            canEdit: false,
            animal: {
                name: '',
                identification: 0,
                age: 0,
                species: '',
                food: '',
                health: '',
                sex: ''
            },
            animalName: ''
        };
        this.handleCanEdit = this.handleCanEdit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleAnimalName = this.handleAnimalName.bind(this);
        this.handleAnimalId = this.handleAnimalId.bind(this);
        this.handleAnimalAge = this.handleAnimalAge.bind(this);
        this.handleAnimalSpecies = this.handleAnimalSpecies.bind(this);
        this.handleAnimalFood = this.handleAnimalFood.bind(this);
        this.handleAnimalHealth = this.handleAnimalHealth.bind(this);
        this.handleAnimalSex = this.handleAnimalSex.bind(this);
        this.handleAnimalUpdate = this.handleAnimalUpdate.bind(this);
    }

    async handleCanEdit(event) {
        event.preventDefault;
        const data = JSON.stringify({
            animalName: this.state.animalName
        });
        try {
            let response = await fetch(`/api/exists?name=${this.state.animalName}`, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let responseData = await response.json();
            if (responseData.success === true) {
                let edit = true;
                this.setState({
                    animal: responseData.animal
                });
                this.setState({ canEdit: true });
            }
        } catch (e) {
            console.log(e);
        }
    }

    async handleAnimalUpdate(event) {
        event.preventDefault();
        let data = JSON.stringify({
            animalData: this.state.animal
        });
        try {
            let response = await fetch('/api/edit', {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: data
            });
            let responseData = await response.json();
            console.log(responseData);
        } catch (e) {
            console.log(e);
        }
    }

    handleName(event) {
        let newName = event.target.value;
        this.setState({ animalName: newName });
    }

    handleAnimalName(event) {
        let name = event.target.value;
        this.setState({
            animal: {
                name: name,
                identification: this.state.animal.identification,
                age: this.state.animal.age,
                species: this.state.animal.species,
                food: this.state.animal.food,
                health: this.state.animal.health,
                sex: this.state.animal.sex
            }
        });
    }

    handleAnimalId(event) {
        let id = event.target.value;
        this.setState({
            animal: {
                identification: id,
                name: this.state.animal.name,
                age: this.state.animal.age,
                species: this.state.animal.species,
                food: this.state.animal.food,
                health: this.state.animal.health,
                sex: this.state.animal.sex
            }
        });
    }

    handleAnimalAge(event) {
        let age = event.target.value;
        this.setState({
            animal: {
                name: this.state.animal.name,
                identification: this.state.animal.identification,
                age: age,
                species: this.state.animal.species,
                food: this.state.animal.food,
                heath: this.state.animal.health,
                sex: this.state.animal.sex
            }
        });
    }

    handleAnimalSpecies(event) {
        let species = event.target.value;
        this.setState({
            animal: {
                name: this.state.animal.name,
                identification: this.state.animal.identification,
                age: this.state.animal.age,
                species: species,
                food: this.state.animal.food,
                health: this.state.animal.health,
                sex: this.state.animal.sex
            }
        });
    }

    handleAnimalFood(event) {
        let food = event.target.value;
        this.setState({
            animal: {
                food: food
            }
        });
    }

    handleAnimalHealth(event) {
        let health = event.target.value;
        this.setState({
            animal: {
                name: this.state.animal.name,
                identification: this.state.animal.identification,
                age: this.state.animal.age,
                species: this.state.animal.species,
                food: this.state.animal.food,
                health: health,
                sex: this.state.animal.sex
            }
        });
    }

    handleAnimalSex(event) {
        let sex = event.target.value;
        this.setState({
            animal: {
                name: this.state.animal.name,
                identification: this.state.animal.identification,
                age: this.state.animal.age,
                species: this.state.animal.species,
                food: this.state.animal.food,
                health: this.state.animal.health,
                sex: sex
            }
        });
    }

    render() {
        let editAnimal = this.state.canEdit;
        return(
            <div>
            {editAnimal ? (
                <div> 
                    <h2> Edit Animal's Entry </h2>
                    <input type="text" value={this.state.animal.name} onChange={this.handleAnimalName} placeholder="Enter animal name" />
                    <input type="number" value={this.state.animal.identification} onChange={this.handleAnimalId} placeholder="Enter animal ID" />
                    <input type="number" value={this.state.animal.age} onChange={this.handleAnimalAge} placeholder="Enter animal's age" />
                    <input type="text" value={this.state.animal.species} onChange={this.handleAnimalSpecies} placeholder="Enter species" />
                    <input type="text" value={this.state.animal.food} onChange={this.handleAnimalFood} placeholder="Enter animal's food choice" />
                    <input type="text" value={this.state.animal.health} onChange={this.handleAnimalHealth} placeholder="Enter animal's health" />
                    <input type="text" value={this.state.animal.sex} onChange={this.handleAnimalSex} placeholder="Enter animal's sex (M or F)" />
                    <button type="button" onClick={this.handleAnimalUpdate}> Edit Animal </button> 
                </div>
            ) : (

                <div>
                    <h2> Enter Animal Name To Edit </h2>
                    <input type="text" value={this.state.animalName} onChange={this.handleName} placeholder="Enter Animal Name" />
                    <button type="button" onClick={this.handleCanEdit}> Edit Animal </button>
                </div>
            )}
            </div>
        );
    }

}
