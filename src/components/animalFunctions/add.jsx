import React, { Component } from 'react';

export default class Add extends Component {

    constructor() {
        super();
        this.state = {
            animalName: '',
            identification: 0,
            age: 0,
            species: '',
            food: '',
            feed: false,
            health: '',
            sex: ''
        };
        this.handleName = this.handleName.bind(this);
        this.handleIdentification = this.handleIdentification.bind(this);
        this.handleAge = this.handleAge.bind(this);
        this.handleSpecies = this.handleSpecies.bind(this);
        this.handleFood = this.handleFood.bind(this);
        this.handleHealth = this.handleHealth.bind(this);
        this.handleSex = this.handleSex.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleName(event) {
        let newName = event.target.value.trim();
        this.setState({ animalName: newName });
    }

    handleIdentification(event) {
        let newId = event.target.value.trim();
        this.setState({ identification: newId });
    }

    handleAge(event) {
        let newAge = event.target.value.trim();
        this.setState({ age: newAge });
    }

    handleSpecies(event) {
        let newSpecies = event.target.value.trim();
        this.setState({ species: newSpecies });
    }

    handleFood(event) {
        let newFood = event.target.value.trim();
        this.setState({ food: newFood });
    }

    handleHealth(event) {
        let newHealth = event.target.value.trim();
        this.setState({ health: newHealth });
    }

    handleSex(event) {
        let newSex = event.target.value.trim();
        this.setState({ sex: newSex });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = JSON.stringify({
            animalName: this.state.animalName,
            identification: this.state.identification,
            age: this.state.age,
            species: this.state.species,
            food: this.state.food,
            health: this.state.health,
            sex: this.state.sex
        });
        try {
            let response = await fetch('/api/add', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            });
            let responseData = await response.json();
            this.setState({
                animalName: '',
                identification: 0,
                age: 0,
                species: '',
                food: '',
                health: '',
                sex: ''
            });
            console.log(responseData);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return(
            <div> 
                <h2 className="center"> Add New Animal To Database </h2>
                <input type="text" value={this.state.animalName} onChange={this.handleName} placeholder="Enter animal name" />
                <input type="number" value={this.state.identification} onChange={this.handleIdentification} placeholder="Enter animal ID" />
                <input type="number" value={this.state.age} onChange={this.handleAge} placeholder="Enter animal's age" />
                <input type="text" value={this.state.species} onChange={this.handleSpecies} placeholder="Enter species" />
                <input type="text" value={this.state.food} onChange={this.handleFood} placeholder="Enter animal's food choice" />
                <input type="text" value={this.state.health} onChange={this.handleHealth} placeholder="Enter animal's health" />
                <input type="text" value={this.state.sex} onChange={this.handleSex} placeholder="Enter animal's sex (M or F)" />
                <button type="button" onClick={this.handleSubmit}> Add Animal </button> 
            </div>
        );
    }

}
