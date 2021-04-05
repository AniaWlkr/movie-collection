class LocalStorageService {
  constructor() {
    this.movie = {};
    this._moviesList = { watсhed: [], inQueue: [] };
    this._moviesListKey = 'movie';
    this._currentPageKey = 'currentPage';
    this.addToQueue = this.addToQueue.bind(this);
    this.addToWatched = this.addToWatched.bind(this);
    this.getMoviesFromStorage = this.getMoviesFromStorage.bind(this);
    this.checkCurrentMovieInQueueList = this.checkCurrentMovieInQueueList.bind(this);
    this.checkCurrentMovieInWatchedList = this.checkCurrentMovieInWatchedList.bind(this);
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
    console.log(currentInQueueMovieList);
    const isIdExist = currentInQueueMovieList.find(obj => obj.id === Number(id));
    return isIdExist ? true : false;
  }

  checkCurrentMovieInWatchedList(id) {
    this.newMoviesList();
    const currentInWatchedMovieList = this._moviesList.watсhed;
    console.log(currentInWatchedMovieList);
    const isIdExist = currentInWatchedMovieList.find(obj => obj.id === Number(id));
    return isIdExist ? true : false;
  }

  saveToStorage(key, element) {
    localStorage.setItem(key, JSON.stringify(element));
  }

  addToWatched() {
    this.newMoviesList();
    this._moviesList.watсhed.push(this.movie);
    this.saveToStorage(this._moviesListKey, this._moviesList);
  }

  addToQueue() {
    this.newMoviesList();
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
    const poster_path = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
    const original_title = data.original_title;
    const vote_average = data.vote_average;
    const vote_count = data.vote_count;
    const popularity = data.popularity;
    const genres = data.genres;
    return {id, homepege,  poster_path,  original_title, vote_average, vote_count, popularity, genres};
  }

  // getСurrentThemeFromStorage() {
  //   this.takeFromStorage(this._currentPageKeyName);
  // }

 
}

const newlocalStorage = new LocalStorageService();

export default newlocalStorage;










