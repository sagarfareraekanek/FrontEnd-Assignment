import axios from 'axios';

const API_KEY = 'b67017057c472a904d6089ca6e0368cc';
const method = 'flickr.photos.search'

export default axios.create({
  baseURL: 'https://api.flickr.com/services/rest/',
  params:{
    method: method,
    api_key: API_KEY,
    format: 'json',
    nojsoncallback: '?',
    per_page: 50
  }

  // baseURL: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b67017057c472a904d6089ca6e0368cc&format=json&text=cat'

});