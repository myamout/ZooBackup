import React, { Component } from 'react';

export default class EditInventory extends Component {
    constructor() {
        super();
        this.state = {
            item: {
                food_type: '',
                food_amount: 0,
                location: '',
                food_type_error: '',
                food_amount_error: '',
                location_error: ''
            },
            canEdit: false,
            food_type: '',
            food_type_error: '',
            form_accepted: ''
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
        const err = this.validateSearch();
        if (!err) {
        try {
            let response = await fetch(`/api/exists_inventory?food_type=${this.state.food_type}`, {
                method: 'get'
            });
            let responseData = await response.json();
            console.log(responseData);
            if (responseData.success === true) {
                this.setState({
                    canEdit: true,
                    item: {
                        food_type: responseData.item.food_type,
                        food_amount: responseData.item.food_amount,
                        location: responseData.item.location,
                        food_type_error: '',
                        food_amount_error: '',
                        location_error: ''
                    }
                });
            } else {
                console.log(responseData);
                this.setState({
                    canEdit: false,
                    food_type_error: "This item does not exist."
                });
            }
        } catch (error) {
            console.log(error);
        }
        }
    }

    validateSearch = () => {
        let isError = false;
        this.setState({ form_accepted: '' })
        if (this.state.food_type.length == 0) {
            isError = true;
            this.state.food_type_error = 'No name was given.';
        }

        this.setState({
            ...this.state
        });

        return isError;
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
        const err = this.validateSubmit();
        if (!err) {
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
                        location: '',
                        food_type_error: '',
                        food_amount_error: '',
                        location_error: ''
                    }
                });
                this.setState({ canEdit: false });
                this.setState({ food_type: '' });
                this.setState({ food_type_error: ''});
                this.setState({ form_accepted: true });
            } catch(error) {
                console.log(error);
            }
        }
    }

    validateSubmit = () => {
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

        let edit_item;
        let item_entry;

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

        if (this.state.food_type_error) {
            edit_item = <div className="alert alert-warning" role="alert">
                {this.state.food_type_error}
            </div>
            window.scrollTo(0, 0);
        } else if (this.state.form_accepted === true) {
            edit_item = <div className="alert alert-success" role="alert">
                Changes to the item was saved!
            </div>
            window.scrollTo(0, 0);
        }


        item_entry = <div className="miniContainer">
                <h3> Enter Item to Edit</h3>
                <hr></hr>
                {edit_item}
                <div className="form-group">
                    <div>
                        <input type="text" className="form-control" value={this.state.food_type} onChange={this.handleFood} placeholder="Enter Food Type" />
                        <button className = "buttonSpacer" type="button" onClick={this.handleCanEdit}> Edit Item </button>
                    </div>
                </div>
            </div>


        if (this.state.canEdit === true) {
            item_entry = <div className="largeContainer">
                    <div>
                        <h2> Edit Item </h2>
                        <hr></hr>
                        
                        {food_type}

                        {food_amount}

                        {location}

                        <button type="button" onClick={this.handleSubmit}> Save Changes </button>

                    </div>
                </div>

            window.scrollTo(0, 0);

        }


        return(
            <div>
                
                {item_entry}

            </div>
        );
    }
}
