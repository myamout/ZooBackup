import React, { Component } from 'react';

export default class View extends Component {

    constructor() {
        super();
        this.state = {
            animals: []
        };
    }

    render() {
        return(
          <div className="largeContainer">
            <h1> View page </h1>
          </div>
        )
    }

}
