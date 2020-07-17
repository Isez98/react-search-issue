const axios = require('axios');

function getGithubInfo(itemString, pageCounter){  
  const gitJson = axios.default.get(`https://api.github.com/repos/facebook/react/issues?page=${pageCounter}&per_page=100`, {
    'headers':{
      'Authorization': `token ${'8618f703d80a1d300125e6591e8c6dc7ed267967'}`
    }
  })
  .then(function(response) {
    const miniList = Object.keys(response.data).map((key) => [response.data[key].title]);    
    miniList.map((value, index) => {
      itemString[index] = value[0];
      return itemString;
    }    
    );
    pageCounter += 1;  
    return itemString  
  })
  .catch(function(error){
    console.log(error);
  });
  return gitJson;
}

export async function GetData(search){
  let stringList = [];
  var pageCounter = 1;  
  let objectData = await getGithubInfo(stringList, pageCounter);      
  var results = [];
  if(search === '')
    return results = [''];
  var rx = new RegExp('([^"]*'+search+'[^"]*)','gi');
  for(var key of objectData){
    if(String(key).match(rx))
      {
        if (results.length >= 5)
          break;
        results.push(key);          
      }
  }
  return results;  
}