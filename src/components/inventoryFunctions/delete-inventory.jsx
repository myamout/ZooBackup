import React, { Component } from 'react';

export default class DeleteInventory extends Component {
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
                <h1> Only an Admin may delete an item from inventory </h1>
            );
        }
    }
}

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            item: {
                food_type: '',
                food_type_error: ''
            }
        };
        this.handleFoodType = this.handleFoodType.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleFoodType(event) {
        this.setState({
            item: {
                food_type: event.target.value
            }
        });
    }

    async handleDelete(event) {
        event.preventDefault();
        const err = this.validate();
        if (!err) {
            const data = JSON.stringify({
                food_type: this.state.item.food_type
            });
            let response = await fetch('/api/delete_inventory', {
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
                this.setState({
                    form_accepted: false
                });
            } else {
                this.setState({
                    form_accepted: true,
                    item: {
                        food_type: '',
                        food_type_error: ''
                    }
                });
            }
        }
    }

    validate = () => {
        let isError = false;

        if (this.state.item.food_type.trim().length == 0) {
            isError = true;
            this.state.item.food_type_error = 'No food type was given.';
        }

        this.setState({
            ...this.state
        });

        return isError;
    }

    render() {

        let food = <div className="form-group">
                <div>
                    <input type="text" className="form-control" value={this.state.item.food_type} onChange={this.handleFoodType} placeholder="Enter Food Type To Remove" />
                </div>
            </div>

        if (this.state.item.food_type_error) {
            food = <div className="form-group">
                    <div>
                        <input type="text" className="form-control is-invalid" value={this.state.item.food_type} onChange={this.handleFoodType} placeholder="Enter Food Type To Remove" />
                        <span style={{color: "#dc3545", textAlign: "left"}}>{this.state.item.food_type_error}</span>
                    </div>
                </div>
        }

        let deleted_item;

        if (this.state.form_accepted === true) {
            deleted_item = <div className="alert alert-success" role="alert">
                An item was successfully deleted.
            </div>
            window.scrollTo(0, 0);
        } else if (this.state.form_accepted === false) {
            deleted_item = <div className="alert alert-warning" role="alert">
                That food type does not exist.
            </div>
            window.scrollTo(0, 0);
        }


        return(
                <div className="miniContainer">
                    <h3> Item To Delete From Inventory</h3>
                    <hr></hr>
                    {deleted_item}
                    {food}
                    <button className = "buttonSpacer" type="button" onClick={this.handleDelete}> Delete Item </button>
                        
                </div>

            );
    }
}
