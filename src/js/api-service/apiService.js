import axios from 'axios';
import settings from '../settings/movie-settings';
const { BASE_URL, API_KEY } = settings;
import refs from '../refs/refs';
import AuthNotifications from '../notifications/notifications';
import filterTmpl from '../../templates/filter.hbs';
const newNotification = new AuthNotifications();
class MoviesApiServiceVersion {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.genresArr = [];
    this.currentMovie = [];
    this.filterCriteria = '';
     this.genreCriterion = '';
    this.sortByCriterion = '';
    this.movieId = null;
    this.movie = null;
    this.getGenresMovies();
  }

  getResponseAll(newPage) {
    let page = this.page;
    if (newPage) page = newPage;
    const results = this.manyRequest(page, 'all');
    return results;
  }
  async manyRequest(page, key) {
    const requestString = {
      all: ` ${BASE_URL}3/movie/popular?api_key=${API_KEY}&page=${page}`,
      allPlusOne: ` ${BASE_URL}3/movie/popular?api_key=${API_KEY}&page=${
        page + 1
      }`,
      word: `${BASE_URL}3/search/movie?api_key=${API_KEY}&page=${page}&query=${this.query}&include_adult=false&language=en`,
      wordPlusOne: `${BASE_URL}3/search/movie?api_key=${API_KEY}&page=${
        page + 1
      }&query=${this.query}&include_adult=false&language=en`,
      filter: `${BASE_URL}3/discover/movie?api_key=${API_KEY}&page=${page}&language=en-US&with_genres=${this.filterCriteria}`,
      filterPlusOne: `${BASE_URL}3/discover/movie?api_key=${API_KEY}&page=${
        page + 1
      }&language=en-US&with_genres=${this.filterCriteria}`,
    };
    let firstRequetString = null;
    let secondRequetString = null;
    if (key === 'all') {
      firstRequetString = requestString.all;
      secondRequetString = requestString.allPlusOne;
    }
    if (key === 'word') {
      firstRequetString = requestString.word;
      secondRequetString = requestString.wordPlusOne;
    }
    if (key === 'filter') {
      firstRequetString = requestString.filter;
      secondRequetString = requestString.filterPlusOne;
    }
    if (document.documentElement.clientWidth > 1024) {
      const firstRequest = await axios.get(`${firstRequetString}`);
      const {
        data: { results, total_results, total_pages },
      } = firstRequest;
      try {
        if (page === total_pages) throw 'Oops, this is the last page ...';
        const secondRequest = await axios.get(`${secondRequetString}`);
        return {
          data: {
            results: [...results, secondRequest.data.results[0]],
            total_results,
          },
        };
      } catch (error) {
        console.log(error);
        return firstRequest;
      }
    } else {
      return axios.get(`${firstRequetString}`);
    }
  }
 
  getResponseWord(newPage) {
    let page = this.page;
    if (newPage) page = newPage;
    const results = this.manyRequest(page, 'word');
    return results;
  }
  
  getGenresMovies() {
    return axios
      .get(`${BASE_URL}3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
      .then(({ data: genres }) => {
        genres.genres.forEach(element => {
          this.genresArr.push(element);
        });
        refs.genreSelector.insertAdjacentHTML(
          'beforeend',
          filterTmpl(this.genresArr),
        );
      });
  }
  async getResponseInfo(currentId) {
    if (this.movieId === currentId) return this.movie;
    this.movieId = currentId;
    this.movie = {};
    try {
      const { data } = await axios.get(
        `${BASE_URL}3/movie/${currentId}?api_key=${API_KEY}&language=en-US`,
      );
      const { genres } = data;
      const newGenres = genres.map(({ name }) => name); 
      data.genres = [...newGenres];
      this.movie = { ...data };
      return data;
    } catch (error) {
      newNotification.errorObject();
    }
  }
  getTrailer(movie_id) {
    return axios.get(
      `${BASE_URL}3/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`,
    );
  }
  // getMoviesByGenre(newPage) {
  //   let page = this.page;
  //   if (newPage) page = newPage;
  //   const results = this.manyRequest(page, 'filter');
  //   return results;
  // }
  getMoviesByGenre(newPage) {
    let page = this.page;
    if (newPage) page = newPage;
    let str = '';
    if (this.genreCriterion && !this.sortByCriterion) {
      str = `&with_genres=${this.genreCriterion}`;
    }
    if (this.sortByCriterion && !this.genreCriterion) {
      str = `&sort_by=${this.sortByCriterion}`;
    }
    if (this.genreCriterion && this.sortByCriterion) {
      str = `&with_genres=${this.genreCriterion}&sort_by=${this.sortByCriterion}`;
    }
    return axios.get(
      `${BASE_URL}3/discover/movie?api_key=${API_KEY}&page=${page}&language=en-US${str}`,
    );
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
const newApi = new MoviesApiServiceVersion();
export { newApi };
