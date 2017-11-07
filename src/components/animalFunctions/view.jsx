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
    ActionBar,
    ActionBarRow,
    SelectedFilters,
    ResetFilters,
    NoHits,
    Pagination
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
                <h1> View animals in database here </h1>
                <div className="row"> 
                    <div className="col"> 
                        <SearchkitProvider searchkit={searchkit}>
                            <Layout>
                                <LayoutBody>
                                    <SideBar>
                                        <HierarchicalMenuFilter fields={["age.raw", "food.raw", "sex.raw"]} title="Filters" id="filters" />
                                        <RefinementListFilter id="species" title="Species" field="species.raw" operator="AND" size={10} />
                                    </SideBar>
                                    <LayoutResults> 
                                        <ActionBar> 
                                            <ActionBarRow> <HitsStats /> </ActionBarRow>
                                            <ActionBarRow> <SelectedFilters /> <ResetFilters /> </ActionBarRow>
                                        </ActionBar>
                                        <div className="search"> 
                                            <Search />
                                        </div>
                                        <Hits hitsPerPage={5} mod={'sk-hits-list'} listComponent={HitItems} />
                                        <NoHits translations={{
                                            "NoHits.NoResultsFound" : "No matches found for {query}",
                                            "NoHits.DidYouMean" : "Search for {suggestion}",
                                            "NoHits.SearchWithoutFilters" : "Search for {query} without filters"
                                        }} suggestionsField="name" />
                                    </LayoutResults>
                                    <Pagination showNumbers={true} />
                                </LayoutBody>
                            </Layout>
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
            queryOptions={{analyzer: 'standard'}} />
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