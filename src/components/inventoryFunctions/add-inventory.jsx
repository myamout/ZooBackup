import React, { Component } from 'react';

export default class AddInventory extends Component {
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
            item: {
                food_type: '',
                food_amount: 0,
                location: '',
                food_type_error: '',
                food_amount_error: '',
                location_error: ''
            }
        };
        // Whenever we want to manipulate the state inside of a function
        // we must bind the function in the constructor like so
        
        this.handleFoodType = this.handleFoodType.bind(this);
        this.handleFoodAmount = this.handleFoodAmount.bind(this);
        this.handleFoodLocation = this.handleFoodLocation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // The next methods are generally the same so see all the comments here
    // We are updating the state whatever the user enters into the input field
    // (see onChnage={this.handleAnimalName} inside of the input component in the render function)
    // event.target.value holds the new animal name
    // This function gets called whenever the user types something in
    handleFoodType(event) {
        this.setState({
            item: {
                food_type: event.target.value,
                food_amount: this.state.item.food_amount,
                location: this.state.item.location
            }
        });
    }
    
    handleFoodAmount(event) {
        this.setState({
            item: {
                food_type: this.state.item.food_type,
                food_amount: event.target.value,
                location: this.state.item.location
            }
        });
    }

    handleFoodLocation(event) {
        this.setState({
            item: {
                food_type: this.state.item.food_type,
                food_amount: this.state.item.food_amount,
                location: event.target.value
            }
        });
    }

    // This function handles the submit (adds animal to Elastic index)
    async handleSubmit(event) {
        // event.preventDefault prevents a page refresh
        event.preventDefault();
        console.log(this.state.item);
        const err = this.validate();
        if (!err) {
            try {
                let response = await fetch(`/api/exists_inventory?food_type=${this.state.food_type}`, {
                    method: 'get'
                });
                let responseData = await response.json();

                console.log(responseData);

                if (responseData.success === true) {
                    this.setState({
                        form_accepted: false,
                    });
                } else {

                    if (responseData.success === false) {
                        // create a json object of the state variable animal
                        const data = JSON.stringify(this.state.item);
                        try {
                            // Inside of this fetch call's options we add
                            // the headers and a body -> body is the json object we just made
                            let response = await fetch('/api/add_inventory', {
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
                                item: {
                                    food_type: '',
                                    food_amount: 0,
                                    location: '',
                                    food_type_error: '',
                                    food_amount_error: '',
                                    location_error: ''
                                }
                            });
                            this.setState({
                                form_accepted: true
                            })
                        } catch(error) {
                            console.log(error);
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    validate = () => {
        let isError = false;
        const errors = {};
        if (this.state.item.food_type.trim().length == 0) {
            isError = true;
            this.state.item.food_type_error = 'No food type was given.'
        }
        if (this.state.item.food_amount.length == 0) {
            isError = true;
            this.state.item.food_amount_error = 'No food amount was given.'
        }
        if (this.state.item.location.trim().length == 0) {
            isError = true;
            this.state.item.location_error = 'No storage location was given.'
        }

        this.setState({
            ...this.state
        });

        return isError
    }

    render() {
        // This is what gets rendered to the dom
        // Notice each input component has a value and an onChange field that links to a state
        // variable and function
        // The button has an onClick field that will call the function that adds the animal to the database
        let food_type = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Food Type</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" value={this.state.item.food_type} onChange={this.handleFoodType} placeholder="Enter food type" />

                </div>
            </div>

        if (this.state.item.food_type_error) {
            food_type = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Food Type</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control is-invalid" value={this.state.item.food_type} onChange={this.handleFoodType} placeholder="Enter food type" />
                    <span style={{color: "#dc3545", textAlign: "left"}}>{this.state.item.food_type_error}</span>
                </div>
            </div>
        }

        let food_amount = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Amount Of Food</label>
                <div className="col-sm-10">
                    <input type="number" className="form-control" value={this.state.item.food_amount} onChange={this.handleFoodAmount} placeholder="Enter amount of food (lbs)" />
                </div>
            </div>

        if (this.state.item.food_amount_error) {
            food_amount = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Amount Of Food</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control is-invalid" value={this.state.item.food_amount} onChange={this.handleFoodAmount} placeholder="Enter amount of food (lbs)" />
                    <span style={{color: "#dc3545", textAlign: "left"}}>{this.state.item.food_amount_error}</span>
                </div>
            </div>
        }

        let location = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Storage Location</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" value={this.state.item.location} onChange={this.handleFoodLocation} placeholder="Enter storage location" />
                </div>
            </div>
        if (this.state.item.location_error) {
            location = <div className="form-group row">
                <label className="col-sm-2 col-form-label">Storage Location</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control is-invalid" value={this.state.item.location} onChange={this.handleFoodLocation} placeholder="Enter storage location" />
                    <span style={{color: "#dc3545", textAlign: "left"}}>{this.state.item.location_error}</span>
                </div>
            </div>
        }

        let added_item;

        if (this.state.form_accepted === true) {
            added_item = <div className="alert alert-success" role="alert">
                Item was successfully added to Zoo's inventory
            </div>
            window.scrollTo(0, 0);
        } else if (this.state.form_accepted === false) {
            added_item = <div className="alert alert-warning" role="alert">
                An item with that name already exists!
            </div>
            window.scrollTo(0, 0);
        }

        return(
            <div className="largeContainer">
                <div>
                    <h2> Add Inventory Item </h2>
                    <hr></hr>

                    {added_item}
                    
                    {food_type}

                    {food_amount}

                    {location}

                    <button type="button" onClick={this.handleSubmit}> Add Item </button>

                </div>
            </div>
        );
    }
}
