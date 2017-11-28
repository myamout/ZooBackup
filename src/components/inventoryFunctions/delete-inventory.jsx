import React, { Component } from 'react';

export default class DeleteInventory extends Component {
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
                food_type: ''
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
        } else {
            this.setState({
                item: {
                    food_type: ''
                }
            });
        }
    }

    render() {
        return(
                <div className="miniContainer">
                    <h3> Item To Delete From Inventory</h3>
                    <hr></hr>
                    <div className="form-group">
                        <div>
                            <input type="text" className="form-control" value={this.state.item.food_type} onChange={this.handleFoodType} placeholder="Enter Food Type To Remove" />
                            <button className = "buttonSpacer" type="button" onClick={this.handleDelete}> Delete Item </button>
                        </div>
                    </div>
                </div>

            );
    }
}
