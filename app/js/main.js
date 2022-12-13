console.log("Main");

const apiConnect = {

  async search(type, searchString) {
    url = `https://webknox-recipes.p.rapidapi.com/recipes/search?query=${searchString}&type=${type}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a28c9f371dmsh5d7b4dc354ec0c2p1be43fjsn397ad3f9cce4',
        'X-RapidAPI-Host': 'webknox-recipes.p.rapidapi.com'
      }
    };
    
    const response = await fetch(url, options);
    const json = await response.json();
    return json.results;
  }
}

function searchDisplay(result){
  let resultList = document.getElementById('resultsList');
  resultList.innerHTML = '';
  result.forEach(r => {
    let li = document.createElement('li');
    let link = document.createElement('a');
    let linkText = document.createTextNode(r.title);
      link.appendChild(linkText);
      link.title = r.title;
      link.href = r.sourceUrl;
      li.appendChild(link);
    // let save = document.createElement('button');
    // save.innerText = 'Save to Meals';
    // li.appendChild(save);
    resultList.appendChild(li);
    console.log(r);
  });
}

const mealSearch = document.getElementById('mealSearch');
mealSearch.addEventListener('click', function(event) {
  event.preventDefault();
  let searchForm = document.getElementById('mealSearch');
  let type = searchForm[0].value;
  let value = searchForm[1].value;
  apiConnect.search(type, value).then(result => searchDisplay(result))
});