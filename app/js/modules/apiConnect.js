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