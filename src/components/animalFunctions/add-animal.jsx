import React, { Component } from 'react';

export default class AddAnimal extends Component {
    constructor() {
        super();
        // The state variable is what holds all of the
        // global variables inside of the add-animal component
        // Think of Repository Software Architecture :)
        this.state = {
            permissions: 0,
            form_accepted: ''
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
            // console.log(this.state.permissions);
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
                animal_name_error: '',
                age: 0,
                animal_age_error: '',
                animal_type: '',
                animal_type_error: '',
                animal_food: '',
                animal_food_error: '',
                animal_health: 0,
                animal_health_error: '',
                animal_gender: '',
                animal_gender_error: '',
                animal_origin: '',
                animal_origin_error: '',
                animal_weight: 0,
                animal_weight_error: '',
                animal_enclosure_id: 0,
                animal_enclosure_id_error: '',
                animal_size: '',
                animal_size_error: ''
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
        this.handleAnimalOrigin = this.handleAnimalOrigin.bind(this);
        this.handleAnimalWeight = this.handleAnimalWeight.bind(this);
        this.handleAnimalEnclosureId = this.handleAnimalEnclosureId.bind(this);
        this.handleAnimalSize = this.handleAnimalSize.bind(this);
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
                animal_gender: this.state.animal.animal_gender,
                animal_origin: this.state.animal.animal_origin,
                animal_weight: this.state.animal.animal_weight,
                animal_enclosure_id: this.state.animal.animal_enclosure_id,
                animal_size: this.state.animal.animal_size
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
                animal_gender: this.state.animal.animal_gender,
                animal_origin: this.state.animal.animal_origin,
                animal_weight: this.state.animal.animal_weight,
                animal_enclosure_id: this.state.animal.animal_enclosure_id,
                animal_size: this.state.animal.animal_size
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
                animal_gender: this.state.animal.animal_gender,
                animal_origin: this.state.animal.animal_origin,
                animal_weight: this.state.animal.animal_weight,
                animal_enclosure_id: this.state.animal.animal_enclosure_id,
                animal_size: this.state.animal.animal_size
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
                animal_gender: this.state.animal.animal_gender,
                animal_origin: this.state.animal.animal_origin,
                animal_weight: this.state.animal.animal_weight,
                animal_enclosure_id: this.state.animal.animal_enclosure_id,
                animal_size: this.state.animal.animal_size
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
                animal_gender: this.state.animal.animal_gender,
                animal_origin: this.state.animal.animal_origin,
                animal_weight: this.state.animal.animal_weight,
                animal_enclosure_id: this.state.animal.animal_enclosure_id,
                animal_size: this.state.animal.animal_size
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
                animal_gender: event.target.value,
                animal_origin: this.state.animal.animal_origin,
                animal_weight: this.state.animal.animal_weight,
                animal_enclosure_id: this.state.animal.animal_enclosure_id,
                animal_size: this.state.animal.animal_size
            }
        });
    }

    handleAnimalOrigin(event) {
        this.setState({
            animal: {
                name: this.state.animal.name,
                age: this.state.animal.age,
                animal_type: this.state.animal.animal_type,
                animal_food: this.state.animal.animal_food,
                animal_health: this.state.animal.animal_health,
                animal_gender: this.state.animal.animal_gender,
                animal_origin: event.target.value,
                animal_weight: this.state.animal.animal_weight,
                animal_enclosure_id: this.state.animal.animal_enclosure_id,
                animal_size: this.state.animal.animal_size
            }
        });
    }

    handleAnimalWeight(event) {
        this.setState({
            animal: {
                name: this.state.animal.name,
                age: this.state.animal.age,
                animal_type: this.state.animal.animal_type,
                animal_food: this.state.animal.animal_food,
                animal_health: this.state.animal.animal_health,
                animal_gender: this.state.animal.animal_gender,
                animal_origin: this.state.animal.animal_origin,
                animal_weight: event.target.value,
                animal_enclosure_id: this.state.animal.animal_enclosure_id,
                animal_size: this.state.animal.animal_size
            }
        });
    }

    handleAnimalEnclosureId(event) {
        this.setState({
            animal: {
                name: this.state.animal.name,
                age: this.state.animal.age,
                animal_type: this.state.animal.animal_type,
                animal_food: this.state.animal.animal_food,
                animal_health: this.state.animal.animal_health,
                animal_gender: this.state.animal.animal_gender,
                animal_origin: this.state.animal.animal_origin,
                animal_weight: this.state.animal.animal_weight,
                animal_enclosure_id: event.target.value,
                animal_size: this.state.animal.animal_size
            }
        });
    }

    handleAnimalSize(event) {
        this.setState({
            animal: {
                name: this.state.animal.name,
                age: this.state.animal.age,
                animal_type: this.state.animal.animal_type,
                animal_food: this.state.animal.animal_food,
                animal_health: this.state.animal.animal_health,
                animal_gender: this.state.animal.animal_gender,
                animal_origin: this.state.animal.animal_origin,
                animal_weight: this.state.animal.animal_weight,
                animal_enclosure_id: this.state.animal.animal_enclosure_id,
                animal_size: event.target.value
            }
        });
    }

    // This function handles the submit (adds animal to Elastic index)
    async handleSubmit(event) {
        // event.preventDefault prevents a page refresh
        event.preventDefault();
        console.log(this.state.animal);
        const err = this.validateSubmit();
        if (!err) {
            try {
                let response = await fetch(`/api/exists?name=${this.state.animal.name}`, {
                    method: 'get'
                });
                let responseData = await response.json();
                if (responseData.success === false) {
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
                                animal_name_error: '',
                                age: 0,
                                animal_age_error: '',
                                animal_type: '',
                                animal_type_error: '',
                                animal_food: '',
                                animal_food_error: '',
                                animal_health: 0,
                                animal_health_error: '',
                                animal_gender: '',
                                animal_gender_error: '',
                                animal_origin: '',
                                animal_origin_error: '',
                                animal_weight: 0,
                                animal_weight_error: '',
                                animal_enclosure_id: 0,
                                animal_enclosure_id_error: '',
                                animal_size: '',
                                animal_size_error: ''
                            }
                        });
                        this.setState({
                            form_accepted: true
                        })
                    } catch(error) {
                        console.log(error);
                    }
                } else {
                    this.setState({
                        form_accepted: false,
                    })
                }
            } catch (error) {
                console.log(error);
            }            
        }
    }

    validateSubmit = () => {
        let isError = false;

        if (this.state.animal.name.trim().length == 0) {
            isError = true;
            this.state.animal.animal_name_error = 'No name was given.'
        }
        if (this.state.animal.age.length == 0) {
            isError = true;
            this.state.animal.animal_age_error = 'No age was given.'
        }
        if (this.state.animal.animal_type.trim().length == 0) {
            isError = true;
            this.state.animal.animal_type_error = 'No species was given.'
        }
        if (this.state.animal.animal_food.trim().length == 0) {
            isError = true;
            this.state.animal.animal_food_error = 'No food was given.'
        }
        if (this.state.animal.animal_health.length == 0) {
            isError = true;
            this.state.animal.animal_health_error = 'No health was given.'
        }
        if (this.state.animal.animal_gender.trim().length == 0) {
            isError = true;
            this.state.animal.animal_gender_error = 'No gender was given.';
        }
        if (this.state.animal.animal_origin.trim().length == 0) {
            isError = true;
            this.state.animal.animal_origin_error = 'No origin was given.';
        }
        if (this.state.animal.animal_weight.length == 0) {
            isError = true;
            this.state.animal.animal_weight_error = 'No weight was given.';
        }
        if (this.state.animal.animal_enclosure_id.length == 0) {
            isError = true;
            this.state.animal.animal_enclosure_id_error = 'No enclosure id was given.';
        }
        if (this.state.animal.animal_size.trim().length == 0) {
            isError = true;
            this.state.animal.animal_size_error = 'No size (S/M/L) was given.';
        }

        this.setState({
            ...this.state
        });

        return isError;
    }


    render() {
        // This is what gets rendered to the dom
        // Notice each input component has a value and an onChange field that links to a state
        // variable and function
        // The button has an onClick field that will call the function that adds the animal to the database
        let animal_name = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" value={this.state.animal.name} onChange={this.handleAnimalName} placeholder="Enter animal name" />

                </div>
            </div>

        if (this.state.animal.animal_name_error) {
            animal_name = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control is-invalid" value={this.state.animal.name} onChange={this.handleAnimalName} placeholder="Enter animal name" />
                    <span style={{color: "#dc3545", textAlign: "left"}}>{this.state.animal.animal_name_error}</span>
                </div>
            </div>
        }

        let animal_age = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Age</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control" value={this.state.animal.age} onChange={this.handleAnimalAge} placeholder="Enter animal's age" />
                </div>
            </div>

        if (this.state.animal.animal_age_error) {
            animal_age = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Age</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control is-invalid" value={this.state.animal.age} onChange={this.handleAnimalAge} placeholder="Enter animal's age" />
                    <span style={{color: "#dc3545", textAlign: "left"}}>{this.state.animal.animal_age_error}</span>
                </div>
            </div>
        }

        let animal_type = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Species</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" value={this.state.animal.animal_type} onChange={this.handleAnimalType} placeholder="Enter species" />
                </div>
            </div>

        if (this.state.animal.animal_type_error) {
            animal_type = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Species</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control is-invalid" value={this.state.animal.animal_type} onChange={this.handleAnimalType} placeholder="Enter species" />
                    <span style={{color: "#dc3545", textAlign: "left"}}>{this.state.animal.animal_type_error}</span>
                </div>
            </div>
        }

        let animal_food = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Food Choice</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" value={this.state.animal.animal_food} onChange={this.handleAnimalFood} placeholder="Enter animal's food choice" />
                </div>
            </div>


        if (this.state.animal.animal_food_error) {
            animal_food = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Food Choice</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control is-invalid" value={this.state.animal.animal_food} onChange={this.handleAnimalFood} placeholder="Enter animal's food choice" />
                    <span style={{color: "#dc3545", textAlign: "left"}}>{this.state.animal.animal_food_error}</span>
                </div>
            </div>
        }


        let animal_health = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Health Rating</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control" value={this.state.animal.animal_health} onChange={this.handleAnimalHealth} placeholder="Enter animal's health" />
                </div>
            </div>

        if (this.state.animal.animal_health_error) {
            animal_health = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Health Rating</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control is-invalid" value={this.state.animal.animal_health} onChange={this.handleAnimalHealth} placeholder="Enter animal's health." />
                    <span style={{color: "#dc3545", textAlign: "left"}}>{this.state.animal.animal_health_error}</span>
                </div>
            </div>
        }

        let animal_gender = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Sex</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" value={this.state.animal.animal_gender} onChange={this.handleAnimalGender} placeholder="Enter animal's sex (M or F)" />
                </div>
            </div>

        if (this.state.animal.animal_gender_error) {
            animal_gender = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Sex</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control is-invalid" value={this.state.animal.animal_gender} onChange={this.handleAnimalGender} placeholder="Enter animal's sex (M or F)" />
                    <span style={{color: "#dc3545", textAlign: "left"}}>{this.state.animal.animal_gender_error}</span>
                </div>
            </div>
        }

        let animal_origin = <div className="form-group row">
            <label className="col-sm-2 col-form-label">Origin</label>
            <div className="col-sm-10">
                <input type="text" className="form-control" value={this.state.animal.animal_origin} onChange={this.handleAnimalOrigin} placeholder="Enter animal's origin" />
            </div>
        </div>

        if (this.state.animal.animal_origin_error) {
            animal_origin = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Origin</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control is-invalid" value={this.state.animal.animal_origin} onChange={this.handleAnimalOrigin} placeholder="Enter animal's origin" />
                    <span style={{color: "#dc3545", textAlign: "left"}}>{this.state.animal.animal_origin_error}</span>
                </div>
            </div>
        }

        let animal_weight = <div className="form-group row">
            <label className="col-sm-2 col-form-label">Weight (lbs)</label>
            <div className="col-sm-10">
                <input type="text" className="form-control" value={this.state.animal.animal_weight} onChange={this.handleAnimalWeight} placeholder="Enter animal's weight (lbs)" />
            </div>
        </div>

        if (this.state.animal.animal_weight_error) {
            animal_weight = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Weight (lbs)</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control is-invalid" value={this.state.animal.animal_weight} onChange={this.handleAnimalWeight} placeholder="Enter animal's weight (lbs)" />
                    <span style={{color: "#dc3545", textAlign: "left"}}>{this.state.animal.animal_weight_error}</span>
                </div>
            </div>
        }

        let animal_enclosure_id = <div className="form-group row">
            <label className="col-sm-2 col-form-label">Enclosure ID</label>
            <div className="col-sm-10">
                <input type="text" className="form-control" value={this.state.animal.animal_enclosure_id} onChange={this.handleAnimalEnclosureId} placeholder="Enter animal's enclosure id" />
            </div>
        </div>

        if (this.state.animal.animal_enclosure_id_error) {
            animal_enclosure_id = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Enclosure ID</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control is-invalid" value={this.state.animal.animal_enclosure_id} onChange={this.handleAnimalEnclosureId} placeholder="Enter animal's enclosure id" />
                    <span style={{color: "#dc3545", textAlign: "left"}}>{this.state.animal.animal_enclosure_id_error}</span>
                </div>
            </div>
        }

        let animal_size = <div className="form-group row">
            <label className="col-sm-2 col-form-label">Animal's Size (S/M/L)</label>
            <div className="col-sm-10">
                <input type="text" className="form-control" value={this.state.animal.animal_size} onChange={this.handleAnimalSize} placeholder="Enter animal's size (S/M/L)" />
            </div>
        </div>

        if (this.state.animal.animal_size_error) {
            animal_size = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Animal's Size (S/M/L)</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control is-invalid" value={this.state.animal.animal_size} onChange={this.handleAnimalSize} placeholder="Enter animal's size (S/M/L)" />
                    <span style={{color: "#dc3545", textAlign: "left"}}>{this.state.animal.animal_size_error}</span>
                </div>
            </div>
        }

        let added_animal;

        if (this.state.form_accepted === true) {
            added_animal = <div className="alert alert-success" role="alert">
                An animal was successfully added to the zoo!
            </div>
            window.scrollTo(0, 0);
        } else if (this.state.form_accepted === false) {
            added_animal = <div className="alert alert-warning" role="alert">
                An animal with that name already exists!
            </div>
            window.scrollTo(0, 0);
        }

        return(
            <div className="largeContainer">
                <div>
                    <h2> Add Animal </h2>
                    <hr></hr>
                    {added_animal}
                    {animal_name}
                    {animal_age}
                    {animal_type}
                    {animal_food}
                    {animal_health}
                    {animal_gender}
                    {animal_origin}
                    {animal_weight}
                    {animal_enclosure_id}
                    {animal_size}

                    <button type="button" onClick={this.handleSubmit}> Add Animal </button>

                </div>
            </div>
        );
    }
}
