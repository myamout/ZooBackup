import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app.jsx';

// Renders
render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));
