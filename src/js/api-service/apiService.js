import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/';
const API_KEY = 'be8c1fddab60d3ca36450ce7d48f58dd';

export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  //відповідь фільми в тренді
  getResponseAll(newPage) {
    // по замовчуванню 1 сторінка дальше передаем № сторінки
    let page = this.page;
    if (newPage) page = newPage;
    return axios.get(
      `${BASE_URL}3/trending/all/day?api_key=${API_KEY}&page=${page}`,
    );
  }

  //відповідь при пошуку по слову
  getResponseWord(newPage) {
    // по замовчуванню 1 сторінка дальше передаем № сторінки
    let page = this.page;
    if (newPage) page = newPage;
    return axios.get(
      `${BASE_URL}3/search/movie?api_key=${API_KEY}&page=${page}&query=${this.searchQuery}&include_adult=false&language=en`,
    );
  }

  //відповідь жанри фільміву відповіді масив
  getGenresMovies() {
    return axios
      .get(`${BASE_URL}3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
      .then(({ data: genres }) => genres.genres);
  }
  // получаем id фільма віддаем інфу після кліка по карточці
  getResponseInfo(id) {
    return axios.get(
      `${BASE_URL}3/movie/${id}?api_key=${API_KEY}&language=en-US`,
    );
  }
  genresApi() {
    return axios.get(
      `${BASE_URL}3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    );
  }
  getTrailer(movie_id) {
    return axios.get(
      `${BASE_URL}3/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`,
    );
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  // goToPage(newPage) {
  //   return (this.page = newPage);
  // }
  //   set page(newPage) {
  //     this.page = newPage;
  //   }
}

//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
// АПІ - 2 для темта
class MoviesApiServiceVersion2 {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    //масив жанрів
    this.genresArr = [];
    //робим один запит за жанрами при створенні конструктора і записуєм жанри в масив вище
    this.getGenresMovies();
  }
  //відповідь фільми в тренді
  getResponseAll(newPage) {
    // по замовчуванню 1 сторінка дальше передаем № сторінки
    let page = this.page;
    if (newPage) page = newPage;
    return axios.get(
      `${BASE_URL}3/trending/all/day?api_key=${API_KEY}&page=${page}`,
    );
  }

  //відповідь при пошуку по слову
  getResponseWord(newPage) {
    // по замовчуванню 1 сторінка дальше передаем № сторінки
    let page = this.page;
    if (newPage) page = newPage;
    return axios.get(
      `${BASE_URL}3/search/movie?api_key=${API_KEY}&page=${page}&query=${this.searchQuery}&include_adult=false&language=en`,
    );
  }

  //відповідь жанри фільміву відповіді пишем в масив
  getGenresMovies() {
    return axios
      .get(`${BASE_URL}3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
      .then(({ data: genres }) => {
        genres.genres.forEach(element => {
          this.genresArr.push(element);
        });
      });
  }
  // получаем id фільма віддаем інфу після кліка по карточці
  getResponseInfo(id) {
    return axios.get(
      `${BASE_URL}3/movie/${id}?api_key=${API_KEY}&language=en-US`,
    );
  }
  //дубляж метода getGenresMovies()
  genresApi() {
    return axios.get(
      `${BASE_URL}3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    );
  }
  getTrailer(movie_id) {
    return axios.get(
      `${BASE_URL}3/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`,
    );
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
const newApi = new MoviesApiServiceVersion2();
export { newApi };
