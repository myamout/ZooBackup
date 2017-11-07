import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';


import Home from './animalFunctions/home.jsx';
import View from './animalFunctions/view.jsx';
import Add from './animalFunctions/add.jsx';
import Edit from './animalFunctions/edit.jsx';

// Layout renders the needed component based on
// what link is clicked on the header component
export const Layout = () => (
    <main>
        <Switch>
            <Route exact path='/user' component= {Home} />
            <Route path='/viewAnimals' component={View} />
            <Route path='/addAnimal' component={Add} />
            <Route path='/editAnimal' component={Edit} />
        </Switch>
    </main>
)
