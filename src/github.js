//The React repo is not accessible to all public, therefore
//Axios was implemented to make the http request and to 
//send a PAT(personal access token) as a header
import GITHUB_PAT from './keys.js';
const axios = require('axios');

//The Github API allow for traveling pages in the repos, along with petitioning
//a maximum of 100 elements at a time.
async function githubPayload(){
  //IMPORTANT! Replace GITHUB_PAT with your own GitHub Personal Access Token
  //It is also important to leave the template. Only replace the word GITHUB_PAT with your own token
  let resultList = [];
  try {
    const githubList = await axios.default.get(`https://api.github.com/repos/facebook/react/issues?page=1&per_page=100`, {
      'headers':{
        'Authorization': `token ${GITHUB_PAT}` 
      }
    })

    resultList = githubList.data.map( value => {
      return {
        title: value.title,
        url: String(value.url).replace(`api.`,``).replace(`/repos`,``),
      }
    })

  } catch (error) {
    console.error(error);
  }  

  return resultList;

}

//We receive an array from the GetSearchData and use the search parameter to 
//implement a regex to find elements most associated with what the user is searching for.
//This method return an array of at most five items.
export function getSearchData(search, itemList){
  if(search === '')
    return [''];
  
  let rx = new RegExp('([^"]*'+search+'[^"]*)','gi');
  const listFiltered = itemList.filter(value => String(value.title).match(rx))
  const slicedList = listFiltered.slice(0, 5)
  return slicedList;  
}



export async function getItems() {

  if (window.sessionStorage.getItem(`itemList`) === null) {
    window.sessionStorage.setItem("itemList", 
      JSON.stringify(
        await githubPayload()
      )
    );
  }

  return JSON.parse(window.sessionStorage.getItem(`itemList`));
}