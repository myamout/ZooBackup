import React, { Component } from 'react';

export default class AddAnimal extends Component {
    constructor() {
        super();
        // The state variable is what holds all of the
        // global variables inside of the add-animal component
        // Think of Repository Software Architecture :)
        this.state = {
            permissions: 0,
        };
        
    }
    // This component gets called when the component is rendered
    // to the dom.
    // Adding the async header to the function lets us use the await
    // keyword for AJAX calls
    async componentWillMount() {
        try {
            // fetch is how we communicate with the backend
            // fetch takes in the url route, and a list of options
            // Note -> Any route to the routes.js needs to start with: '/api'
            let response = await fetch('/permissions', {
                method: 'get'
            });
            // responseData will be equal to the json returned by the server
            let responseData = await response.json();
            // this will set the state variable 'permissions'
            // Note -> When changing the state you must call this!!!
            this.setState({
                permissions: responseData.permissions
            });
            console.log(this.state.permissions);
        } catch (error) {
            console.log(error);
        }
    }
    // The render function is what gets rendered to the dom
    // I'm using conditional rendering based on the user permissions
    // This will render the Admin class if the user has the correct permissions
    render() {
        if (this.state.permissions === 1) {
            return(
                <Admin />
            );
        } else {
            return(
                <h1> Only an Admin may add an animal </h1>
            );
        }
    }
}

class Admin extends Component {
    constructor() {
        super();
        // This state has an animal object
        this.state = {
            animal: {
                name: '',
                age: 0,
                animal_type: '',
                animal_food: '',
                animal_health: '',
                animal_gender: ''
            }
        };
        // Whenever we want to manipulate the state inside of a function
        // we must bind the function in the constructor like so
        this.handleAnimalName = this.handleAnimalName.bind(this);
        this.handleAnimalAge = this.handleAnimalAge.bind(this);
        this.handleAnimalType = this.handleAnimalType.bind(this);
        this.handleAnimalFood = this.handleAnimalFood.bind(this);
        this.handleAnimalHealth = this.handleAnimalHealth.bind(this);
        this.handleAnimalGender = this.handleAnimalGender.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // The next methods are generally the same so see all the comments here
    // We are updating the state whatever the user enters into the input field
    // (see onChnage={this.handleAnimalName} inside of the input component in the render function)
    // event.target.value holds the new animal name
    // This function gets called whenever the user types something in
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

    // This function handles the submit (adds animal to Elastic index)
    async handleSubmit(event) {
        // event.preventDefault prevents a page refresh
        event.preventDefault();
        console.log(this.state.animal);
        // create a json object of the state variable animal
        const data = JSON.stringify(this.state.animal);
        try {
            // Inside of this fetch call's options we add
            // the headers and a body -> body is the json object we just made
            let response = await fetch('/api/add', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: data
            });
            let responseData = await response.json();
            // We'll reset the state so the user can enter another animal
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
        } catch(error) {
            console.log(error);
        }
        
    }

    render() {
        // This is what gets rendered to the dom
        // Notice each input component has a value and an onChange field that links to a state
        // variable and function
        // The button has an onClick field that will call the function that adds the animal to the database
        return(
            <div>
                <input type="text" value={this.state.animal.name} onChange={this.handleAnimalName} placeholder="Enter animal name" />
                <input type="number" value={this.state.animal.age} onChange={this.handleAnimalAge} placeholder="Enter animal's age" />
                <input type="text" value={this.state.animal.animal_type} onChange={this.handleAnimalType} placeholder="Enter species" />
                <input type="text" value={this.state.animal.animal_food} onChange={this.handleAnimalFood} placeholder="Enter animal's food choice" />
                <input type="text" value={this.state.animal.animal_health} onChange={this.handleAnimalHealth} placeholder="Enter animal's health" />
                <input type="text" value={this.state.animal.animal_gender} onChange={this.handleAnimalGender} placeholder="Enter animal's sex (M or F)" />
                <button type="button" onClick={this.handleSubmit}> Add Animal </button> 
            </div>
        );
    }
}
