import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app.jsx';

// Renders our Application with the router to
// the div with id "root" in our user.html page
render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));
