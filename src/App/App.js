import React from 'react';
import './App.css';
//Components
import SearchResults from '../Components/SearchResults';

//'Authorization': `token ${'c2cc47d4780316d574ef2ccfbf0aa86ef33427de'}`


function App() {
  return (
    <div className="App">
      <br/>
      <SearchResults/>
    </div>
  );
}

export default App;