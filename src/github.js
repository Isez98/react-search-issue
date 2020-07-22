//The React repo is not accessible to all public, therefore
//Axios was implemented to make the http request and to 
//send a PAT(personal access token) as a header
import GITHUB_PAT from './keys.js';
const axios = require('axios');

//The Github API allow for traveling pages in the repos, along with petitioning
//a maximum of 100 elements at a time.
function GithubPayload(){
  //IMPORTANT! Replace GITHUB_PAT with your own GitHub Personal Access Token
  //It also importan to leave the template. Only replace the word GITHUB_PAT with your own token
  const githubList = axios.default.get(`https://api.github.com/repos/facebook/react/issues?page=1&per_page=100`, {
    'headers':{
      'Authorization': `token ${GITHUB_PAT}` 
    }
  })
  .then(function(response) {
    const list = response.data.map((value) => {
        return {
          title: value.title,
          url: String(value.url).replace(`api.`,``).replace(`/repos`,``),
        }
    })
    
    return list 
  })
  .catch(function(error){
    console.error(error);
  });
  return githubList;
}

//We reveive an array from the GetSearchData and use the search parameter to 
//implement a regex to find elements most associated with what the user is searching for.
//This method return an array of at most five items.
export async function GetSearchData(search){
  let issueList = await GithubPayload();  
  
  if(search === '')
    return [''];
  
  var rx = new RegExp('([^"]*'+search+'[^"]*)','gi');
  

  const listFiltered = issueList.filter(value => String(value.title).match(rx))
  

  const slicedList = listFiltered.slice(0, 5)
  

  return slicedList;  
}