//The React repo is not accessible to all public, therefore
//Axios was implemented to make the http request and to 
//send a PAT(personal access token) as a header
import GITHUB_PAT from '../src/keys';
const axios = require('axios');

//The Github API allow for traveling pages in the repos, along with petitioning
//a maximum of 100 elements at a time.
function GithubPayload(){
  let itemArray = [];  
  //IMPORTANT! Replace GITHUB_PAT with your own GitHub Personal Access Token
  //It also importan to leave the template. Only replace the word GITHUB_PAT with your own token
  const githubList = axios.default.get(`https://api.github.com/repos/facebook/react/issues?page=1&per_page=100`, {
    'headers':{
      'Authorization': `token ${'GITHUB_PAT'}` 
    }
  })
  .then(function(response) {
    const miniList = Object.keys(response.data).map((key) => [response.data[key].title]);    
    miniList.map((value, index) => {
      itemArray[index] = value[0];
      return itemArray;
    }    
    );
    return itemArray  
  })
  .catch(function(error){
    console.log(error);
  });
  return githubList;
}

//We reveive an array from the GetSearchData and use the search parameter to 
//implement a regex to find elements most associated with what the user is searching for.
//This method return an array of at most five items.
export async function GetSearchData(search){
  let issueList = await GithubPayload();      
  var results = [''];
  if(search === '')
    return results;
  var rx = new RegExp('([^"]*'+search+'[^"]*)','gi');
  for(var key of issueList){
    if(String(key).match(rx))
      {
        if (results.length >= 5)
          break;
        results.push(key);          
      }
  }
  return results;  
}