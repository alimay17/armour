console.log("Main");

function addEventListeners(){
  const recipes = document.getElementsByClassName('recipe');
  console.log(recipes);
  Array.from(recipes).forEach(r => {
    r.addEventListener('click', function(event){
    event.preventDefault();
    let id = event.target.id;
  });
});
}

function searchDisplay(result){
  let resultList = document.getElementById('resultsList');
  resultList.innerHTML = '';
  result.forEach(r => {
    let li = document.createElement('li');
    let link = document.createElement('p');
    let linkText = document.createTextNode(r.title);
      link.appendChild(linkText);
      link.setAttribute('class', 'recipe');
      link.setAttribute('id', r.id);
      li.appendChild(link);
    resultList.appendChild(li);
  });
  addEventListeners();
}


const mealSearch = document.getElementById('mealSearch');
mealSearch.addEventListener('click', function(event) {
  event.preventDefault();
  let searchForm = document.getElementById('mealSearch');
  let type = searchForm[0].value;
  let value = searchForm[1].value;
  apiConnect.search(type, value).then(result => searchDisplay(result));
});




