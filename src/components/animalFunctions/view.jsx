import React, { Component } from 'react';

export default class View extends Component {

    constructor() {
        super();
        this.state = {
            animals: []
        };
    }

    async componentWillMount() {
        try {
            let response = await fetch('/api/allAnimals', {
                method: 'get'
            });
            let responseData = await response.json();
            this.setState({
                animals: responseData.animals
            });
            console.log(this.state.animals);
        } catch (error) {
            console.log(error);
        }
    }

    async handleAgeFilter(event) {
        event.preventDefault();
        try {
            let response = await fetch('/api/query', {
                method: 'get'
            });
            let responseData = await response.json();
            console.log(responseData);
            this.setState({
                animals: responseData.animals.hits.hits
            });
            console.log(this.state.animals);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return(
          <div className="largeContainer">
            <button type="button" onClick={this.handleAgeFilter}> Filter Age </button>
            <table> 
                <thead> 
                    <tr>
                        <th> Name </th>
                        <th> Age </th>
                    </tr>
                </thead>
                <tbody> 
                    {this.state.animals.map((animal, i) => {
                        <tr key={animal._id}> 
                            <td key={animal._source.name}> {animal._source.name} </td>
                            <td key={animal._source.age}> {animal._source.age} </td>
                        </tr>
                    })}
                </tbody>
            </table>
          </div>
        )
    }
}

