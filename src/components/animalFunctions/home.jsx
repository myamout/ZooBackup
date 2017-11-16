import React, { Component } from 'react';

export default class Home extends Component {

    // Just renders a h1 tag to the page
    render() {
        return(
        	<div>
	            <h1> Home page </h1>
	            <button type="button" class="btn btn-primary tester">Primary</button>
            </div>
        );
    }

}
