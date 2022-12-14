const apiConnect = {
  options: {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a28c9f371dmsh5d7b4dc354ec0c2p1be43fjsn397ad3f9cce4',
      'X-RapidAPI-Host': 'webknox-recipes.p.rapidapi.com'
    }
  },

  async search(type, searchString) {
    url = `https://webknox-recipes.p.rapidapi.com/recipes/search?query=${searchString}&type=${type}&number=15`;
    
    const response = await fetch(url, this.options);
    const json = await response.json();
    return json.results;
  },

  async getRecipeById(recipeId){
    url = `https://webknox-recipes.p.rapidapi.com/recipes/${recipeId}/information`;
    
    const response = await fetch(url, this.options);
    const json = await response.json();
    return json;
  },

  async extractData(recipeUrl,){
    url = `https://webknox-recipes.p.rapidapi.com/recipes/extract?url=${recipeUrl}`;
    console.log(url);
    const response = await fetch(url, this.options);
    const json = await response.json();
    return json;
  }
}