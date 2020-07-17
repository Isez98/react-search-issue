import React from 'react';
import {GetData} from '../../getGitInfo.js'
import '../../App/App.css'

class SearchResults extends React.Component{
  constructor(props) {
    super(props);
    this.state = { searchResults: [], inputValue: '' }
    this.handleChange = this.handleChange.bind(this)
  }

 async handleChange(e){
    this.setState({ inputValue: e.target.value })
    let searchResults = []
    if(e.target.value !== "" )
      searchResults = await GetData(this.state.inputValue);      
    this.setState({ searchResults });
  }

  render(){
    return(
      <div className="search-engine-container">
      <h1 className="engine-title">React Search Issues</h1>
      <input type="text" className="search-box" onChange={this.handleChange} value={this.state.inputValue}></input>
       <ul> 
       {
          (this.state.searchResults || []).map(result => (
            <li>
              <div key={result} className="search-results">
                <div className="text-container">{result}</div>
              </div>
            </li>
            ))
        } 
        </ul>
      </div>
    );
  }
}

export default SearchResults;