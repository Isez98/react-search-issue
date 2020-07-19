import React from 'react';
import {GetSearchData} from '../../github.js'
import '../../App/App.css'

class SearchResults extends React.Component{
  constructor(props) {
    super(props);
    this.state = { searchResults: [], inputValue: '', cursor: 0}
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  //Asynchronous function to handle changes made to the input element
  //This event triggers the GetData method, which makes the search
  //for the React library issues.
  async handleChange(e){
    let cursor = 0;
    this.setState({cursor});
    this.setState({ inputValue: e.target.value })
    let searchResults = []
    if(e.target.value !== "" )
      searchResults = await GetSearchData(this.state.inputValue);      
    this.setState({ searchResults });
  }

  //The KeyDown handler listents to when the user presses the 
  //down or up key, which then triggers the change in state for
  //the element selected by the cursor
  handleKeyDown(e) {
    const {cursor, searchResults} = this.state;
    //Up key
    if (e.keyCode === 38 && cursor > 0 ) {
      this.setState( prevState => ({
        cursor: prevState.cursor - 1,
        inputValue: searchResults[cursor - 1]
      }))
    } 
    //Down key
    else if (e.keyCode === 40 && cursor < searchResults.length - 1) {
    this.setState( prevState => ({
      cursor: prevState.cursor + 1,
      inputValue: searchResults[cursor + 1]
    }))
    }
  }

  render(){
    return(
      <div className="search-engine-container">
        <h1 className="engine-title">React Search Issues</h1>
        <input 
          type="text" 
          className="search-box" 
          onChange={this.handleChange} 
          onKeyDown={this.handleKeyDown}
          value={this.state.inputValue}>
        </input>
        <ul> 
        {
          //The items in the array are mapped here
          (this.state.searchResults || []).map((result, index) => (
            <li key={index}>
              <div id={index} className="search-results"
              style={this.state.cursor === index ? {backgroundColor: 'gray'} : null}
              >
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