import noImage from '../../images/movies-card/noimage.jpg';
class LocalStorageService {
  constructor() {
    this.movie = {};
    this._moviesList = { watсhed: [], inQueue: [] };
    this._moviesListKey = 'movie';
    this._currentPageKey = 'currentPage';
    this.addToQueue = this.addToQueue.bind(this);
    this.addToWatched = this.addToWatched.bind(this);
    this.getMoviesFromStorage = this.getMoviesFromStorage.bind(this);
    this.checkCurrentMovieInQueueList = this.checkCurrentMovieInQueueList.bind(
      this,
    );
    this.checkCurrentMovieInWatchedList = this.checkCurrentMovieInWatchedList.bind(
      this,
    );
    this.removeMovieFromQueue = this.removeMovieFromQueue.bind(this);
    this.removeMovieFromWatched = this.removeMovieFromWatched.bind(this);
  }

  set addMovieObj(newObj) {
    this.movie = this.createObjForStoring(newObj);
  }

  newMoviesList() {
    const newMovieList = this.takeFromStorage(this._moviesListKey);
    if (!newMovieList) return;
    return (this._moviesList = newMovieList);
  }

  checkCurrentMovieInQueueList(id) {
    this.newMoviesList();
    const currentInQueueMovieList = this._moviesList.inQueue;
    const isIdExist = currentInQueueMovieList.find(
      obj => obj.id === Number(id),
    );
    return isIdExist ? true : false;
  }

  checkCurrentMovieInWatchedList(id) {
    this.newMoviesList();
    const currentInWatchedMovieList = this._moviesList.watсhed;
    const isIdExist = currentInWatchedMovieList.find(
      obj => obj.id === Number(id),
    );
    return isIdExist ? true : false;
  }

  saveToStorage(key, element) {
    localStorage.setItem(key, JSON.stringify(element));
  }

  addToWatched() {
    console.log('add to watched');
    this.newMoviesList();
    const id = this.movie.id;
    if (this.checkCurrentMovieInWatchedList(id)) return;
    this._moviesList.watсhed.push(this.movie);
    this.saveToStorage(this._moviesListKey, this._moviesList);
  }

  addToQueue() {
    console.log('add to queue');
    this.newMoviesList();
    const id = this.movie.id;
    if (this.checkCurrentMovieInQueueList(id)) return;
    this._moviesList.inQueue.push(this.movie);
    this.saveToStorage(this._moviesListKey, this._moviesList);
  }

  saveCurrentPageToStorage(page) {
    this.saveToStorage(this._currentPageKey, page);
  }

  getCurrentPageFromStorage() {
    return this.takeFromStorage(this._currentPageKey);
  }

  takeFromStorage(key) {
    try {
      const storageItem = localStorage.getItem(key);
      return storageItem === null ? undefined : JSON.parse(storageItem);
    } catch (error) {
      console.error(`Parse error: ${error}`);
    }
  }

  getMoviesFromStorage() {
    return this.takeFromStorage(this._moviesListKey);
  }

  createObjForStoring(data) {
    const id = data.id;
    const homepege = data.homepage;
    let poster_path;
    if (!data.poster_path) {
          poster_path = noImage;
        } else {
          poster_path =
            'https://image.tmdb.org/t/p/w500' + data.poster_path;
        }
    const original_title = data.original_title;
    const vote_average = data.vote_average.toFixed(1);
    const vote_count = data.vote_count;
    const popularity = data.popularity;
    let genres = data.genres;
    if (genres.length > 2) {
          genres = genres.slice(0, 2);
          genres.push(' Other');
        }
    const release_date = data.release_date.slice(0, 4);
    return {id, homepege,  poster_path,  original_title, vote_average, vote_count, popularity, genres, release_date};
  }

  removeMovieFromQueue() {
    console.log('remove from queue');
    this.newMoviesList();
    const id = this.movie.id;
    const currentInQueueMoviesList = this._moviesList.inQueue;
    const newArreyOfMoviesinQueue = currentInQueueMoviesList.filter(
      obj => obj.id !== Number(id),
    );
    this._moviesList.inQueue = newArreyOfMoviesinQueue;
    this.saveToStorage(this._moviesListKey, this._moviesList);
  }

  removeMovieFromWatched() {
    console.log('remove from watched');
    this.newMoviesList();
    const id = this.movie.id;
    const currentWatchedMoviesList = this._moviesList.watсhed;
    const newArreyOfWatchedMovies = currentWatchedMoviesList.filter(
      obj => obj.id !== Number(id),
    );
    this._moviesList.watсhed = newArreyOfWatchedMovies;
    this.saveToStorage(this._moviesListKey, this._moviesList);
  }
}

const newlocalStorage = new LocalStorageService();

export default newlocalStorage;
