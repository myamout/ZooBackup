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
                animal_health: 0,
                animal_gender: '',
                animal_origin: '',
                animal_weight: 0,
                animal_enclosure_id: 0,
                animal_size: 0
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
        this.handleAnimalOrigin = this.handleAnimalOrigin.bind(this);
        this.handleAnimalWeight = this.handleAnimalWeight.bind(this);
        this.handleAnimalEnclosureId = this.handleAnimalEnclosureId.bind(this);
        this.handleAnimalSize = this.handleAnimalSize.bind(this);
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
                        animal_gender: responseData.animal.animal_gender,
                        animal_origin: responseData.animal.animal_origin,
                        animal_weight: responseData.animal.animal_weight,
                        animal_enclosure_id: responseData.animal.animal_enclosure_id,
                        animal_size: responseData.animal.animal_size
                    }
                });
            } else {
                console.log(responseData);
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
                    animal_health: 0,
                    animal_gender: '',
                    animal_origin: '',
                    animal_weight: 0,
                    animal_enclosure_id: 0,
                    animal_size: 0
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
                    <div className="miniContainer">
                        <h3> Enter Animal to Edit</h3>
                        <hr></hr>
                        <div className="form-group">
                            <div>
                                <input type="text" className="form-control" value={this.state.name} onChange={this.handleName} placeholder="Enter Animal Name" />
                                <button className = "buttonSpacer" type="button" onClick={this.handleCanEdit}> Edit Animal </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="largeContainer">
                            <div>
                                <h2> Edit Animal </h2>
                                <hr></hr>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" value={this.state.animal.name} onChange={this.handleAnimalName} placeholder="Enter animal name" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-2 col-form-label">Age</label>
                                    <div className="col-sm-10">
                                        <input type="number" className="form-control" value={this.state.animal.age} onChange={this.handleAnimalAge} placeholder="Enter animal's age" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-2 col-form-label">Species</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" value={this.state.animal.animal_type} onChange={this.handleAnimalType} placeholder="Enter species" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-2 col-form-label">Food Choice</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" value={this.state.animal.animal_food} onChange={this.handleAnimalFood} placeholder="Enter animal's food choice" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-2 col-form-label">Health</label>
                                    <div className="col-sm-10">
                                        <input type="number" className="form-control" value={this.state.animal.animal_health} onChange={this.handleAnimalHealth} placeholder="Enter animal's health" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-2 col-form-label">Sex</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" value={this.state.animal.animal_gender} onChange={this.handleAnimalGender} placeholder="Enter animal's sex (M or F)" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-2 col-form-label">Origin</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" value={this.state.animal.animal_origin} onChange={this.handleAnimalOrigin} placeholder="Enter animal's origin" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-2 col-form-label">Weight</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" value={this.state.animal.animal_weight} onChange={this.handleAnimalWeight} placeholder="Enter animal's weight (lbs)" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-2 col-form-label">Enclosure ID</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" value={this.state.animal.animal_enclosure_id} onChange={this.handleAnimalEnclosureId} placeholder="Enter animal's enclosure id" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-2 col-form-label">Size</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" value={this.state.animal.animal_size} onChange={this.handleAnimalSize} placeholder="Enter animal's size (S/M/L)" />
                                    </div>
                                </div>
                                
                                

                                <button type="button" onClick={this.handleSubmit}> Save Changes </button>

                            </div>
                        </div>
                )}
            </div>
        );
    }
}
