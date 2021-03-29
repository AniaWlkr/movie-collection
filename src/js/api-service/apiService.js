import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/';
const API_KEY = 'be8c1fddab60d3ca36450ce7d48f58dd';

export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  getResponseAll() {
    return axios.get(`${BASE_URL}3/movie/popular?api_key=${API_KEY}&page=1`);
  }
  getResponseWord() {
    return axios.get(
      `${BASE_URL}3/search/movie?api_key=${API_KEY}&page=1&query=${this.searchQuery}&include_adult=false&language=en`,
    );
  }
  getResponseInfo() {
    return axios.get(
      `${BASE_URL}3/movie/{movie_id}?api_key=${API_KEY}&language=en-US`,
    );
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  goToPagePopular(page) {
    this.page = page;
    return this.getResponseAll();
  }
}
