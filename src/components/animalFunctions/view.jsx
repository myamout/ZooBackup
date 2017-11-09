import React, { Component } from 'react';
import {
    SearchBox,
    Hits,
    HitsStats,
    SearchkitComponent,
    SearchkitManager, 
    SearchkitProvider,
    Layout,
    TopBar,
    LayoutBody,
    LayoutResults,
    SideBar,
    HierarchicalMenuFilter,
    RefinementListFilter,
    NumericRefinementListFilter,
    ActionBar,
    ActionBarRow,
    SelectedFilters,
    ResetFilters,
    NoHits,
    Pagination,
    SortingSelector,
    Toggle
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
        
    }
    
    render() {
        return(
            <div>
                <h1 className="text-center"> View animals in database here </h1>
                <div className="row"> 
                    <div className="col"> 
                        <SearchkitProvider searchkit={searchkit}>
                            <div className="search"> 
                                <Layout> 
                                    <LayoutBody> 
                                        <SideBar> 
                                            <div className="sk-numeric-refinement-list"> 
                                                <NumericRefinementListFilter id="age" title="Age" field="age" options={[
                                                    {title: 'All'},
                                                    {title: '0-10', from:0, to:10},
                                                    {title: '11-18', from:11, to:18},
                                                    {title: '19-25', from:19, to:25}
                                                ]} />
                                            </div>
                                            <RefinementListFilter id="species" title="Species" field="species" operator="AND"
                                                size={5} />
                                            <RefinementListFilter id="food" title="Food" field="food" operator="AND"
                                                size={5} />
                                        </SideBar>
                                        <LayoutResults> 
                                            <div className="sk-search-box"> 
                                                <Search />
                                            </div>
                                            <ActionBar>
                                                <ActionBarRow> 
                                                    <SortingSelector options={[
                                                        {label: "Relevance", field: '_score', order: 'desc', defaultOption: true},
                                                        {label: 'Species', field: 'species', order: 'desc'},
                                                        {label: 'Age', field: 'age', order: 'desc'}
                                                    ]} listComponent={Toggle} />
                                                </ActionBarRow>
                                            </ActionBar>
                                            <ActionBar> 
                                                <ActionBarRow> 
                                                    <HitsStats />
                                                </ActionBarRow>
                                                <ActionBarRow> 
                                                
                                                </ActionBarRow>
                                                <ActionBarRow> 
                                                    <SelectedFilters />
                                                    <ResetFilters />
                                                </ActionBarRow>
                                            </ActionBar>
                                            <div className="search__results"> 
                                            <Hits hitsPerPage={10} sourceFilter={["name", "species", "age", "food", "sex"]} mod='sk-hits-grid'
                                        listComponent={HitItems} />
                                    <NoHits translations={{
                                        "NoHits.NoResultsFound" : "No matches found for {query}",
                                        "NoHits.DidYouMean" : "Search for {suggestion}",
                                        "NoHits.SearchWithoutFilters" : "Search for {query} without filters"
                                        }} suggestionsField="name"/>
                                            </div>
                                        </LayoutResults>
                                    </LayoutBody>
                                </Layout>
                            </div>
                        </SearchkitProvider>
                    </div>
                </div>
            </div>
        );
    }

}

class Search extends SearchkitComponent {
    render() {
        return(
            <SearchBox searchkit={searchkit}
            searchOnChange={true}
            queryOptions={{analyzer: 'standard'}} autofocus={true} />
        );
    }
}

class HitItems extends Component {
    constructor(props) {
        super();
    }

    render() {
        const animalData = this.props.hits;
        const listItems = animalData.map((hit) => 
            <tr key={hit._source.identification}> 
                <td>{hit._source.name}</td>
                <td>{hit._source.species}</td>
                <td>{hit._source.age}</td>
                <td>{hit._source.food}</td>
                <td>{hit._source.health}</td>
                <td>{hit._source.sex}</td>
            </tr>
        );
        return(
            <div style={{width: '100%', boxSizing: 'border-box', padding: 8}}>
            <table className="sk-table sk-table-striped" style={{width: '100%', boxSizing: 'border-box'}}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Species</th>
                  <th>Age</th>
                  <th>Food</th>
                  <th>Health</th>
                  <th>Sex</th>
                </tr>
              </thead>
              <tbody>
                {listItems}
              </tbody>
            </table>
          </div>
        );
    }
}