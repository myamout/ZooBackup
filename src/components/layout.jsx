import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';


import Home from './animalFunctions/home.jsx';
import View from './animalFunctions/view.jsx';
import AddAnimal from './animalFunctions/add-animal.jsx';
import EditAnimal from './animalFunctions/edit-animal.jsx';
import DeleteAnimal from './animalFunctions/delete-animal.jsx';

// The Layout component renders the needed component depending on what the
// user clicks on the nav bar
export const Layout = () => (
    <main>
        <Switch>
            <Route exact path='/user' component= {Home} />
            <Route path='/viewAnimals' component={View} />
            <Route path='/addAnimal' component={AddAnimal} />
            <Route path='/editAnimal' component={EditAnimal} />
            <Route path='/deleteAnimal' component={DeleteAnimal} />
        </Switch>
    </main>
)
