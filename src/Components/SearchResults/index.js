import React from 'react';
import {GetData} from '../../getGitInfo.js'
import '../../App/App.css'

class SearchResults extends React.Component{
  constructor(props) {
    super(props);
    this.state = { searchResults: [], inputValue: '', cursor: 0, gray: true }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  async handleChange(e){
    let cursor = 1;
    this.setState({cursor});
    this.setState({ inputValue: e.target.value })
    let searchResults = []
    if(e.target.value !== "" )
      searchResults = await GetData(this.state.inputValue);      
    this.setState({ searchResults });
  }

  handleKeyDown(e) {
    const cursor = this.state.cursor;
    const searchResults = this.state.searchResults;
    if (e.keyCode === 38 && cursor >= 0) {
      this.setState( prevState => ({
        cursor: prevState.cursor - 1
      }))
      this.setState({gray: this.state.gray})
    } else if (e.keyCode === 40 && cursor < searchResults.length) {
      this.setState( prevState => ({
        cursor: prevState.cursor + 1
      }))
      console.log(searchResults[cursor])
    }
  }

  changeColor(){
    this.setState({gray: !this.state.gray})
  }

  render(){
    let itemClass = this.state.gray ? 'unfocused-item' : 'focused-item';
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
            <li 
              key={index} 
              style={ this.state.cursor == index ? { backgroundColor: this.state.gray } : { backgroundColor: !this.state.gray }}>
              <div className="search-results">
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