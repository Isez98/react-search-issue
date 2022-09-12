import React, {useState, useEffect} from 'react';
import {getSearchData, getItems} from '../../github.js'
import '../../App/App.css'

import { key } from "./KeysCodes";

function SearchResults(props){
  //Declaration of constant state values
  const [cursor, setCursor] = useState(0);
  const [inputValue, setInputValue] = useState(``);
  const [searchResults, setSearchResults] = useState([]);

  //Asynchronous function to handle changes made to the input element
  //This event triggers the GetData method, which makes the search
  //for the React library issues.
  const handleChange = (e) => {
    setCursor(0)
    setInputValue(e.target.value);
    setSearchResults([]);
  }

  useEffect(() => {
    setSearchResults(getItems())
  }, [inputValue])

  useEffect(() => {console.log(searchResults)}, [searchResults])

  //The KeyDown handler listens to when the user presses the 
  //down or up key, which then triggers the change in state for
  //the element selected by the cursor
  const handleKeyDown = (e) => {
    //Up key
    if (e.keyCode === key.UP && cursor > 0 ) {
      setCursor(cursor - 1);
      setInputValue(searchResults[cursor - 1].title);   
    } 
    //Down key
    else if (e.keyCode === key.DOWN && cursor < searchResults.length - 1) {
      setCursor(cursor + 1);
      setInputValue(searchResults[cursor + 1].title);
    }
    //Enter key, changes text and redirect to GitHub issue page.
    else if (e.keyCode === key.ENTER){
      window.open(`${searchResults[cursor].url}`)
      setCursor(0);      
    }
  }

  //Triggers when mouse enters list area
  const handleMouseEnter = (index) => { 
    setCursor(index);
  }
  
  //Triggers when mouse left clicks, redirect to issue page
  const handleOnClick = (title, link) =>{
    setInputValue(title);
    window.open(`${link}`)
  }

  const renderedItems = () => {
    if (searchResults){
      searchResults.map((result, index) => (
        <li key={index}>
          <div key={index} className="search-results"
          onMouseEnter={(e) => handleMouseEnter(index, e)}
          onClick={(e) => handleOnClick(result.title, result.url, e)}
          style={cursor === index ? {backgroundColor: 'gray'} : null}
          >
            <div className="text-container">{result.title}</div>
          </div>
        </li>
      ))
    }
  }
  
  return(
    <div className="search-engine-container">
      <div>
        <h1 className="engine-title">React Search Issues</h1>
      </div>
      <div>
          <input 
        type="text" 
        className="search-box" 
        onChange={handleChange} 
        onKeyDown={handleKeyDown}
        value={inputValue}>
      </input>
      <ul> 
      {
        //The items in the array are mapped here
        renderedItems
      } 
      </ul>
      </div>   
    </div>
  );  
}

export default SearchResults;