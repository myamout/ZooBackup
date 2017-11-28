import React, { Component } from 'react';

export default class DeleteAnimal extends Component {
    constructor() {
        super();
        this.state = {
            permissions: 0,
            form_accepted: ''
        };
    }

    async componentWillMount() {
        try {
            let response = await fetch('/permissions', {
                method: 'get'
            });
            let responseData = await response.json();
            this.setState({
                permissions: responseData.permissions
            });
            console.log(this.state.permissions);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        if (this.state.permissions === 1) {
            return(
                <Admin />
            );
        } else {
            return(
                <h1> Only an Admin may delete an animal </h1>
            );
        }
    }
}

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            animal: {
                name: '',
                animal_name_error: ''
            }
        };
        this.handleAnimalName = this.handleAnimalName.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleAnimalName(event) {
        this.setState({
            animal: {
                name: event.target.value
            }
        });
    }

    async handleDelete(event) {
        event.preventDefault();
        const err = this.validate();
        if (!err) {
            const data = JSON.stringify({
                name: this.state.animal.name
            });
            let response = await fetch('/api/delete', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: data
            });
            let responseData = await response.json();
            if (responseData.success === false) {
                console.log('Animal not found.');
                this.setState({
                    form_accepted: false
                });
            } else {
                this.setState({
                    form_accepted: true,
                    animal: {
                        name: '',
                        animal_name_error: ''
                    }
                });
            }
        }
    }

    validate = () => {
        let isError = false;

        if (this.state.animal.name == '') {
            isError = true;
            this.state.animal.animal_name_error = 'No name was given.'
        }

        this.setState({
            ...this.state
        });

        return isError
    }

    render() {

        let animal_name = <div className="form-group">
                <input type="text" className="form-control" value={this.state.animal.name} onChange={this.handleAnimalName} placeholder="Enter animal name to delete" />
            </div>

        if (this.state.animal.animal_name_error) {
            animal_name = <div className="form-group">
                <input type="text" className="form-control is-invalid" value={this.state.animal.name} onChange={this.handleAnimalName} placeholder="Enter animal name to delete" />
                <span style={{color: "#dc3545", textAlign: "left"}}>{this.state.animal.animal_name_error}</span>
            </div>
        }

        let deleted_animal;

        if (this.state.form_accepted === true) {
            deleted_animal = <div className="alert alert-success" role="alert">
                An animal was successfully deleted from the zoo!
            </div>
            window.scrollTo(0, 0);
        } else if (this.state.form_accepted === false) {
            deleted_animal = <div className="alert alert-warning" role="alert">
                An animal with that name does not exist!
            </div>
            window.scrollTo(0, 0);
        }

        return(
            <div className="miniContainer">
                <h3>Animal to Delete</h3>
                <hr></hr>
                {deleted_animal}
                {animal_name}
                <button type="button" onClick={this.handleDelete}> Delete Animal </button>
            </div>
        );
    }
}
