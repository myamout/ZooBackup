import React, { Component } from 'react';

export default class DeleteAnimal extends Component {
    constructor() {
        super();
        this.state = {
            permissions: 0
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
                name: ''
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
            console.log('error');
        } else {
            this.setState({
                animal: {
                    name: ''
                }
            });
        }
    }

    render() {
        return(
        <div>
                <div>
                    <input type="text" value={this.state.animal.name} onChange={this.handleAnimalName} placeholder="Enter animal name to delete" />
                    <button type="button" onClick={this.handleDelete}> Delete Animal </button>
                </div>
                <div className="miniContainer">
                    <h3> Enter Animal to Edit</h3>
                    <hr></hr>
                    <div className="form-group">
                        <div>
                            <input type="text" value={this.state.animal.name} onChange={this.handleAnimalName} placeholder="Enter animal name to delete" />
                            <button type="button" onClick={this.handleDelete}> Delete Animal </button>
                        </div>
                    </div>
                </div>
                </div>
            );
    }
}
