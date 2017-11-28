import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';


import Home from './animalFunctions/home.jsx';
import View from './animalFunctions/view.jsx';
import AddAnimal from './animalFunctions/add-animal.jsx';
import EditAnimal from './animalFunctions/edit-animal.jsx';
import DeleteAnimal from './animalFunctions/delete-animal.jsx';
import ViewInventory from './inventoryFunctions/view-inventory.jsx';
import AddInventory from './inventoryFunctions/add-inventory.jsx';
import EditInventory from './inventoryFunctions/edit-inventory.jsx';
import DeleteInventory from './inventoryFunctions/delete-inventory.jsx';

// The Layout component renders the needed component depending on what the
// user clicks on the nav bar
export const Layout = () => (
    <main>
        <Switch>
            <Route exact path='/user' component= {Home} />
            <Route path='/viewAnimals' component={View} />
            <Route path='/viewInventory' component={ViewInventory} />
            <Route path='/addAnimal' component={AddAnimal} />
            <Route path='/addInventory' component={AddInventory} />
            <Route path='/editAnimal' component={EditAnimal} />
            <Route path='/editInventory' component={EditInventory} />
            <Route path='/deleteAnimal' component={DeleteAnimal} />
            <Route path='/deleteInventory' component={DeleteInventory} />
        </Switch>
    </main>
)
