
/*----------  Functions  ----------*/
function searchDisplay(result){
  let resultList = document.getElementById('resultsList');
  resultList.innerHTML = '';
  result.forEach(r => {
    let li = document.createElement('li');
    let link = document.createElement('a');
    let linkText = document.createTextNode(r.title);
      link.appendChild(linkText);
      link.setAttribute('class', 'recipe');
      link.setAttribute('id', r.id);
      link.setAttribute('href', `html/mealDetail.html?id=${r.id}`);
      li.appendChild(link);
    resultList.appendChild(li);
  });
}

function detailDisplay(result){
  let summary = document.getElementById('summary');
  let title = document.getElementById('mealTitle');
  let instructions = document.getElementById('instructions');
  let ingredientList = document.getElementById('ingredientList');

  summary.innerHTML = result.summary;
  title.innerText = result.title;
  instructions.innerHTML = result.instructions;

  result.extendedIngredients.forEach(i => {
    let li = document.createElement('li');
    li.innerText = i.original;
    ingredientList.appendChild(li);
  })
}

/*----------  Main ----------*/
let page = window.location.href;

if(page.includes('index.html')){
  const mealSearch = document.getElementById('mealSearch');
  mealSearch.addEventListener('click', function(event) {
    event.preventDefault();
    let searchForm = document.getElementById('mealSearch');
    let type = searchForm[0].value;
    let value = searchForm[1].value;
    apiConnect.search(type, value).then(result => searchDisplay(result));
  });
}

if (page.includes('mealDetail.html')) {
  let rId = window.location.search.substring(1).split('=')[1];
  apiConnect.getRecipeById(rId).then(result => detailDisplay(result));
}

