import React, { Component } from 'react';
import {
    SearchBox,
    RefinementListFilter,
    Hits,
    HitsStats,
    SearchkitComponent,
    SelectedFilters,
    MenuFilter,
    HierarchicalMenuFilter,
    Pagination,
    ResetFilters,
    SearchkitManager, 
    SearchkitProvider
    } from "searchkit";

// Connects SearchKit to our Elastic cluster animal index
const searchkit = new SearchkitManager('http://localhost:9200/animals');

export default class View extends Component {

    constructor() {
        super();
        this.state = {
            animals: []
        };
    }

    async componentWillMount() {
        let response = await fetch('/api/view', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let responseData = await response.json();
        let animalData = responseData.animals;
        this.setState({ animals: animalData });
        console.log(this.state.animals);
    }
    
    render() {
        return(
            <div>
                <h1> View animals in database here </h1>
                <SearchkitProvider searchkit={searchkit}>
                    <div>
                        <Search />
                    </div>
                </SearchkitProvider>
            </div>
        );
    }

}

class Search extends SearchkitComponent {
    render() {
        return(
            <div> 
                <SearchBox searchkit={searchkit}
                    searchOnChange={true}
                     />
                <div className="cards"> 
                    <Hits hitsPerPage={5}
                        mod={'sk-hits-grid'}
                        itemComponent={HitItems}
                    />
                </div>
                <HitsStats />
            </div>
        );
    }
}

class HitItems extends Component {
    constructor(props) {
        super();
        console.log(props);
    }

    render() {
        return(
            <div className="card">
                <h5 className="card-header"> {this.props.result._source.name} </h5>
                <p className="card-content"> </p>
                <div className="card-footer center text-center"> <p> Footer </p> </div>
            </div>
        );
    }
}