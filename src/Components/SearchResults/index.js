import React from 'react';
import {GetData} from '../../getGitInfo.js'
import '../../App/App.css'

class SearchResults extends React.Component{
  constructor(props) {
    super(props);
    this.state = { searchResults: [], inputValue: '', cursor: 0, gray: true, lastState: 0 }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  async handleChange(e){
    let cursor = 0;
    this.setState({cursor});
    this.setState({ inputValue: e.target.value })
    let searchResults = []
    if(e.target.value !== "" )
      searchResults = await GetData(this.state.inputValue);      
    this.setState({ searchResults });
  }

  handleKeyDown(e) {
    const {cursor, searchResults, lastState} = this.state;
    if (e.keyCode === 38 && cursor > 0 ) {
      this.setState( prevState => ({
        lastState: this.state.cursor,
        cursor: prevState.cursor - 1
      }))
      console.log(lastState + "  " + cursor + "  " + e.keyCode);
      document.getElementById(lastState).style.background = 'white'
      document.getElementById(this.state.cursor).style.background = 'gray';
      this.setState({inputValue: searchResults[cursor]})
    } else if (e.keyCode === 40 && cursor < searchResults.length - 1) {
      this.setState( prevState => ({
        lastState: this.state.cursor,
        cursor: prevState.cursor + 1
      }))
      console.log(lastState + "  " + cursor + "  " + e.keyCode);
      document.getElementById(lastState).style.background = 'white'
      document.getElementById(this.state.cursor).style.background = 'gray';
      this.setState({inputValue: searchResults[cursor]})
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
          (this.state.searchResults || []).map((result, index) => (
            <li key={index}>
              <div id={index} className="search-results">
                <div >{result}</div>
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