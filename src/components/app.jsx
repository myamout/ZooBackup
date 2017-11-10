import React from 'react';

import { Header } from './header.jsx';
import { Layout } from './layout.jsx';

// App simply renders our Header and Layout component
// The Header is our nav and the layout is the actual components
export const App = () => (
    <div>
        <Header />
        <Layout />
    </div>
);
