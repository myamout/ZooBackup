import React, { Component } from 'react';

export default class EditInventory extends Component {
    constructor() {
        super();
        this.state = {
            item: {
                food_type: '',
                food_amount: 0,
                location: ''
            },
            canEdit: false,
            food_type: ''
        };
        this.handleFood = this.handleFood.bind(this);
        this.handleCanEdit = this.handleCanEdit.bind(this);
        this.handleFoodType = this.handleFoodType.bind(this);
        this.handleFoodAmount = this.handleFoodAmount.bind(this);
        this.handleFoodLocation = this.handleFoodLocation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFood(event) {
        this.setState({
            food_type: event.target.value
        });
    }

    async handleCanEdit(event) {
        event.preventDefault();
        try {
            let response = await fetch(`/api/exists_inventory?food_type=${this.state.food_type}`, {
                method: 'get'
            });
            let responseData = await response.json();
            if (responseData.success === true) {
                this.setState({
                    canEdit: true
                });
                this.setState({
                    item: {
                        food_type: responseData.item.food_type,
                        food_amount: responseData.item.food_amount,
                        location: responseData.item.location
                    }
                });
            } else {
              console.log(responseData);
            }
        } catch (error) {
            console.log(error);
        }
    }

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

    async handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.item);
        const data = JSON.stringify(this.state.item);
        try {
            let response = await fetch('/api/update_inventory', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: data
            });
            let responseData = await response.json();
            this.setState({
                item: {
                    food_type: '',
                    food_amount: 0,
                    location: ''
                }
            });
            this.setState({ canEdit: false });
            this.setState({ food_type: '' });
        } catch(error) {
            console.log(error);
        }

    }

    render() {
        return(
            <div>
                {!this.state.canEdit ? (
                    <div className="miniContainer">
                        <h3> Enter Item to Edit</h3>
                        <hr></hr>
                        <div className="form-group">
                            <div>
                                <input type="text" className="form-control" value={this.state.food_type} onChange={this.handleFood} placeholder="Enter Food Type" />
                                <button className = "buttonSpacer" type="button" onClick={this.handleCanEdit}> Edit Item </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="largeContainer">
                            <div>
                                <h2> Edit Item </h2>
                                <hr></hr>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Food Type</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" value={this.state.item.food_type} onChange={this.handleFoodType} placeholder="Enter food type" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-2 col-form-label">Amount Of Food</label>
                                    <div className="col-sm-10">
                                        <input type="number" className="form-control" value={this.state.item.food_amount} onChange={this.handleFoodAmount} placeholder="Enter amount of food (lbs)" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                  <label className="col-sm-2 col-form-label">Storage Location</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" value={this.state.item.location} onChange={this.handleFoodLocation} placeholder="Enter food's storage location" />
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
