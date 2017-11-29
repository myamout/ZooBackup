import React, { Component } from 'react';

export default class Home extends Component {

    // Just renders a h1 tag to the page
    render() {
        return(
            /*
                Dashboard reports:
                ----
                - Tracking animals with bad health.
                - Amount of different types of animals.
                - Gender differences.
                - Highest & lowest amount of food from inventory
                - Oldest & youngest animals.
            */
            <div className="dashboard-container">
            	<div className="dashboard-card">
    	            <h1> Dashboard </h1>
                    <div>
                    Lorem Ipsum
                    </div>
                </div>
            </div>
        );
    }

}
