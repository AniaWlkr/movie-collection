class LocalStorageService {
  constructor() {
    this.movieId = '';
    this._moviesList = { watсhed: [], inQueue: [] };
    this._watchedMovies = [];
    this._moviesInQueue = [];
    this._moviesListKey = 'movie';
    this._currentPageKey = 'currentPage';
    this.addToQueue = this.addToQueue.bind(this);
    this.addToWatched = this.addToWatched.bind(this);
    this.getMoviesFromStorage = this.getMoviesFromStorage.bind(this);
    this.saveCurrentPageToStorage = this.saveCurrentPageToStorage.bind(this);
  }

  set addMovieId (newId) {
   this.movieId = newId;
  }

  newMoviesList() {
   const newMovieList = this.takeFromStorage(this._moviesListKey);
   if (!newMovieList) return;
   return (this._moviesList = newMovieList);
  }

  createMovieCardObj(element) {
    this.getRefs(element);
    let movieObj = {};
    // movieObj.posterPath = ;
  }

  getRefs(ref) {
    const arr = ref.children;
    console.dir(arr);
  }

  saveToStorage(key, element) {
    localStorage.setItem(key, JSON.stringify(element));
  }

  addToWatched() {
    this.newMoviesList();
    if (this._moviesList.watсhed.includes(this.movieId)) return;
    this._moviesList.watсhed.push(this.movieId);
    this.saveToStorage(this._moviesListKey, this._moviesList);
  }

  addToQueue() {
    this.newMoviesList();
    if (this._moviesList.inQueue.includes(this.movieId)) return;
    this._moviesList.inQueue.push(this.movieId);
    this.saveToStorage(this._moviesListKey, this._moviesList);
  }

  saveCurrentPageToStorage(page) {
    this.saveToStorage(this._currentPageKey, page);
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

  getСurrentPageFromStorage() {
     return this.takeFromStorage(this._currentPageKey);
  }

  // getСurrentThemeFromStorage() {
  //   this.takeFromStorage(this._currentPageKeyName);
  // }

 
}

const newlocalStorage = new LocalStorageService();

export default newlocalStorage;












 // storageHandler (event) {
  //   const activeItem = event.target;

  //   if (activeItem === event.currentTarget) return;

  //   if (activeItem.dataset.active === 'watched') {
  //     this.addToWatched();
  //     activeItem.disabled = true;
  //   }

  //   if (activeItem.dataset.active === 'queue') {
  //     this.addToQueue();
  //     activeItem.disabled = true;
  //   }
  // }

  //Метод для Лены Губаренко
  // addLocalStorageListener(selector) {
  //   selector.addEventListener('click', this.storageHandler);
  // }

  // //Метод для Лены Губаренко
  // removeLocalStorageListener(selector) {
  //   selector.removeEventListener('click', this.storageHandler);
  // }