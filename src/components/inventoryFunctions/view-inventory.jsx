import React, { Component } from 'react';

export default class ViewInventory extends Component {
    constructor() {
        super();
        this.state = {
            items: []
        }
        // Sorts
        this.handleGetAllItems = this.handleGetAllItems.bind(this);
        this.handleAmountSort = this.handleAmountSort.bind(this);

        this.handleGetAllItems();
    }

    async handleGetAllItems() {
        try {
            let response = await fetch('/api/allInventory', {
                method: 'get'
            });
            let responseData = await response.json();
            let allItems = responseData.items;
            let stateArray = []
            allItems.forEach((item) => {
                stateArray.push(item._source);
            });
            this.setState({
                items: stateArray
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleAmountSort(event) {
        event.preventDefault();
        let currentInventory = this.state.items;
        currentInventory.sort((a, b) => {
            let amountA = a.food_amount;
            let amountB = b.food_amount;
            if (amountA > amountB) { return -1; }
            if (amountB < amountA) { return 1; }
            return 0;
        });
        this.setState({
            items: currentInventory
        });
    }



    render() {
        let tableBody = this.state.items.map((item) => {
            return(
                <tr key={item.food_type}> 
                    <td> {item.food_type} </td>
                    <td> {item.food_amount} </td>
                    <td> {item.location} </td>
                </tr>
            );
        });
        return(
            <div>
                <div className="filterContainer">
                    <div className="btn-group middlespacer" role="group" aria-label="Sorts">
                        <button type="button" className="btn btn-secondary" onClick={this.handleAmountSort}>Sort By Amount</button>
                        <button type="button" className="btn btn-secondary" onClick={this.handleGetAllItems}> Reset Sort </button>
                    </div>
                </div>
            <div className="largeContainer">
                <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th> Food Type </th>
                            <th> Amount </th>
                            <th> Storage Location </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        );
    }

}