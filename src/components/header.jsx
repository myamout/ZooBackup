import React from 'react';

import {Link} from 'react-router-dom';

// This renders the nav bar you see at the top of the page
export const Header = () => (
  <div>
    <header>

      <nav className="navbar navbar-expand-lg navbar-inverse">
        <img src="../media/more_consistent_logo.png" className="navLogoSize" alt=""></img>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link"> <Link to='/user'> Home </Link> </a>
            </li>
            <li className="nav-item">
              <a className="nav-link"> <Link to='/viewAnimals'> View Animals </Link> </a>
            </li>
            <li className="nav-item">
              <a className="nav-link"> <Link to='/addAnimal'> Add Animal </Link> </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active"> <Link to='/editAnimal'> Edit Animal </Link> </a>
            </li>
            <li className="nav-item">
              <a className="nav-link"> <Link to='/deleteAnimal'> Delete Animal </Link> </a>
            </li>

            <li className="nav-item">
              <a className="nav-link"> <Link to='/viewInventory'> View Inventory </Link> </a>
            </li>
            <li className="nav-item">
              <a className="nav-link"> <Link to='/addInventory'> Add Item </Link> </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active"> <Link to='/editInventory'> Edit Item </Link> </a>
            </li>
            <li className="nav-item">
              <a className="nav-link"> <Link to='/deleteInventory'> Delete Item </Link> </a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/logout"> Logout </a>
            </li>
            </ul>

        </div>
      </nav>

    </header>
  </div>
)
