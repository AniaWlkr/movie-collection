import axios from 'axios';
import refs from '../refs/refs';

class MoviesApiServiceVersion {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    //масив жанрів
    this.genresArr = [];
    //сюди записуєм фільм на якому користувач зробить клік записуєм після отримання коректної відповіді
    this.currentMovie = [];
    //записываем критерий фильтрации
    this.filterCriteria = '';
    //робим один запит за жанрами при створенні конструктора і записуєм жанри в масив вище
    this.getGenresMovies();
  }
  //відповідь фільми в тренді
  getResponseAll(newPage) {
    // по замовчуванню 1 сторінка дальше передаем № сторінки
    let page = this.page;
    if (newPage) page = newPage;
    const results = this.manyRequest(page);
    return results;
    //варіант на 20 відповідей
    // return axios.get(
    //   `${BASE_URL}3/trending/all/day?api_key=${API_KEY}&page=${page}`,
    // );
  }
  async manyRequest(page) {
    if (document.documentElement.clientWidth > 1024) {
      const firstRequest = await axios.get(
        ` ${refs.BASE_URL}3/movie/popular?api_key=${refs.API_KEY}&page=${page}`,
      );
      const {
        data: { results, total_results, total_pages },
      } = firstRequest;
      try {
        if (page === total_pages) throw 'Last page no no'; // фікс 404 якщо остання сторінка то 2 запрос не робим
        const secondRequest = await axios.get(
          ` ${refs.BASE_URL}3/movie/popular?api_key=${refs.API_KEY}&page=${page}`,
        );
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
      return axios.get(
        ` ${refs.BASE_URL}3/movie/popular?api_key=${refs.API_KEY}&page=${page}`,
      );
    }
  }
  //відповідь при пошуку по слову
  getResponseWord(newPage) {
    // по замовчуванню 1 сторінка дальше передаем № сторінки
    let page = this.page;
    if (newPage) page = newPage;
    return axios.get(
      `${refs.BASE_URL}3/search/movie?api_key=${refs.API_KEY}&page=${page}&query=${this.searchQuery}&include_adult=false&language=en`,
    );
  }
  //відповідь жанри фільміву відповіді пишем в масив
  getGenresMovies() {
    return axios
      .get(
        `${refs.BASE_URL}3/genre/movie/list?api_key=${refs.API_KEY}&language=en-US`,
      )
      .then(({ data: genres }) => {
        genres.genres.forEach(element => {
          this.genresArr.push(element);
        });
      });
  }
  // получаем id фільма віддаем інфу після кліка по карточці
  //фактично непотрібно проганяти через функцію корекції лиш поправити жанри і все
  //старий варіант
  getResponseInfo(id) {
    return axios.get(
      `${refs.BASE_URL}3/movie/${id}?api_key=${refs.API_KEY}&language=en-US`,
    );
  }
  //нове версія з записом обєкта в конструктор при кліку
  /** async getResponseInfo(id) {
    try {
      const { data } = await axios.get(
        `${BASE_URL}3/movie/${id}?api_key=${API_KEY}&language=en-US`,
      );
      const { genres } = data;
      // const newGenresID = genres.map(({ id }) => id); // перезаписуєм по нормальному ID жанрів
      // data.genre_ids = [...newGenresID];
      const newGenres = genres.map(({ name }) => name); // перезаписуєм по нормальному жанри
      data.genres = [...newGenres];
      return data;
    } catch (error) {
      console.log('Такого обєкта немає в базі даних,попробуй наступнй фільм'); //клік по картинці якої немає в бд можна виносити в pnotify
      console.log('Упс, щось пішло не так');
    }
  } */
  getTrailer(movie_id) {
    return axios.get(
      `${refs.BASE_URL}3/movie/${movie_id}/videos?api_key=${refs.API_KEY}&language=en-US`,
    );
  }
  getMoviesByGenre(newPage) {
    let page = this.page;
    if (newPage) page = newPage;
    return axios.get(
      `${refs.BASE_URL}3/discover/movie?api_key=${refs.API_KEY}&page=${page}&language=en-US&with_genres=${this.filterCriteria}`,
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
