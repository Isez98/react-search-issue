const axios = require('axios');

function getGithubInfo(itemString, pageCounter){  
  const gitJson = axios.default.get(`https://api.github.com/repos/facebook/react/issues?page=${pageCounter}&per_page=100`, {
    'headers':{
      'Authorization': `token ${'c2cc47d4780316d574ef2ccfbf0aa86ef33427de'}`
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
  //console.log(objectData);
  var results = [], result;
  if(search === '')
    return results = [''];
  var rx = new RegExp('([^"]*'+search+'[^"]*)','gi');
  for(var key of objectData){
    while(result = rx.exec(key))
      {
        if (results.length >= 5)
          break;
        if (result !== undefined && result != null && result !== false)
          results.push(key);          
      }
  }
  return results;  
}