import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/';
const API_KEY = 'be8c1fddab60d3ca36450ce7d48f58dd';

export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  getResponseAll() {
    return axios.get(
      `${BASE_URL}3/trending/all/day?api_key=${API_KEY}&page=${this.page}`,
    );
  }
  getResponseWord() {
    return axios.get(
      `${BASE_URL}3/search/movie?api_key=${API_KEY}&page=${this.page}&query=${this.searchQuery}&include_adult=false&language=en`,
    );
  }
  getResponseInfo(id) {
    return axios.get(
      `${BASE_URL}3/movie/${id}?api_key=${API_KEY}&language=en-US`,
    );
  }
  genresApi() {
    return axios.get(`${BASE_URL}3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  goToPage(newPage) {
    return (this.page = newPage);
  }
  incrementPage() {
    this.page = 1;
  }
}
