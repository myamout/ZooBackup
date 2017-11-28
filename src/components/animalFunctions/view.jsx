import React, { Component } from 'react';

export default class View extends Component {

    constructor() {
        super();
        this.state = {
            animals: []
        };
        // Sorts
        this.handleGetAllAnimals = this.handleGetAllAnimals.bind(this);
        this.handleNameSort = this.handleNameSort.bind(this);
        this.handleAgeSort = this.handleAgeSort.bind(this);
        this.handleGenderSort = this.handleGenderSort.bind(this);

        // Filters
        this.handleGenderFilter = this.handleGenderFilter.bind(this);

        this.handleGetAllAnimals();
    }

    componentDidUpdate() {
        console.log(this.state.animals);
    }

    async handleGetAllAnimals() {
        try {
            let response = await fetch('/api/allAnimals', {
                method: 'get'
            });
            let responseData = await response.json();
            let allAnimals = responseData.animals;
            let stateArray = [];
            allAnimals.forEach((animal) => {
                stateArray.push(animal._source);
            });
            this.setState({
                animals: stateArray
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleNameSort(event) {
        event.preventDefault();
        let currentAnimals = this.state.animals;
        currentAnimals.sort((a, b) => {
            let nameA = a.name.toUpperCase();
            let nameB = b.name.toUpperCase();
            if (nameA < nameB) { return -1; }
            if (nameA > nameB) { return 1; }
            return 0;
        });
        this.setState({
            animals: currentAnimals
        });
    }

    handleAgeSort(event) {
        event.preventDefault();
        let currentAnimals = this.state.animals;
        currentAnimals.sort((a, b) => {
            let ageA = a.age;
            let ageB = b.age;
            if (ageA < ageB) { return -1; }
            if (ageA > ageB) { return 1; }
            return 0;
        });
        this.setState({
            animals: currentAnimals
        });
    }

    handleGenderSort(event) {
        event.preventDefault();
        let currentAnimals = this.state.animals;
        currentAnimals.sort((a, b) => {
            let genderA = a.animal_gender;
            let genderB = b.animal_gender;
            if (genderA > genderB) { return -1; }
            if (genderA < genderB) { return 1; }
            return 0;
        });
        this.setState({
            animals: currentAnimals
        });
    }

    handleGenderFilter(event) {
        event.preventDefault();
        let currentAnimals = this.state.animals;
        let filteredAnimals = () => {
            return currentAnimals.filter((animal) => {
                return animal.animal_gender.toLowerCase().indexOf('m') === 0;
            });
        }
        currentAnimals = filteredAnimals();
        this.setState({
            animals: currentAnimals
        });
    }

    render() {
        let tableBody = this.state.animals.map((animal) => {
            return(
                <tr key={animal.name}>
                    <td> {animal.name} </td>
                    <td> {animal.age} </td>
                    <td> {animal.animal_type} </td>
                    <td> {animal.animal_food} </td>
                    <td> {animal.animal_health} </td>
                    <td> {animal.animal_gender} </td>
                </tr>
            );
        });
        return(
          <div>
              <div className="filterContainer">
                <div className="btn-group middlespacer" role="group" aria-label="Sorts">
                    <button type="button" className="btn btn-secondary" onClick={this.handleNameSort}>Sort By Name</button>
                    <button type="button" className="btn btn-secondary" onClick={this.handleAgeSort}>Sort By Age</button>
                    <button type="button" className="btn btn-secondary" onClick={this.handleGenderSort}>Sort By Gender</button>
                    <button type="button" className="btn btn-secondary" onClick={this.handleGetAllAnimals}> Reset Sort </button>
                </div>
                <div className="btn-group" role="group" aria-label="Sorts">
                    <button type="button" className="btn btn-secondary" onClick={this.handleGenderFilter}>Filter By Gender Male</button>
                    <button type="button" className="btn btn-secondary" onClick={this.handleGetAllAnimals}>Reset Filters</button>
                </div>
            </div>
            <div className="largeContainer">
                <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th> Name </th>
                            <th> Age </th>
                            <th> Animal </th>
                            <th> Food </th>
                            <th> Health </th>
                            <th> Gender </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </table>
                </div>
            </div>
          </div>
        );
    }
}
