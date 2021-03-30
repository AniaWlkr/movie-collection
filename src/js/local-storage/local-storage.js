class LocalStorageService {
  constructor() {
    this.watched = [];
    this.queue = [];
    this.movieId = '';
    this._keyName = 'movies';
    this.storageHandler = this.storageHandler.bind(this);
  }

  set addMovieId(newId) {
    this.movieId = newId;
  }

  storageHandler(event) {
    const activeItem = event.target;

    if (activeItem === event.currentTarget) return;

    if (activeItem.dataset.active === 'watched') {
      this.addToWatched();
      activeItem.disabled = true;
    }

    if (activeItem.dataset.active === 'queue') {
      this.addToQueue();
      activeItem.disabled = true;
    }
  }

  saveToStorage() {
    const moviesList = {
      watched: this.watched,
      inQueue: this.queue,
    };

    localStorage.setItem(this._keyName, JSON.stringify(moviesList));
  }

  //Метод для Лены Гоевой
  takeFromStorage() {
    try {
      const moviesList = localStorage.getItem(this._keyName);

      return moviesList === null ? undefined : JSON.parse(moviesList);
    } catch (error) {
      console.error(`Parse error: ${error}`);
    }
  }

  addToWatched() {
    this.watched.push(this.movieId);
    this.saveToStorage();
  }

  addToQueue() {
    this.queue.push(this.movieId);
    this.saveToStorage();
  }

  //Метод для Лены Губаренко
  addLocalStorageListener(selector) {
    selector.addEventListener('click', this.storageHandler);
  }

  //Метод для Лены Губаренко
  removeLocalStorageListener(selector) {
    selector.removeEventListener('click', this.storageHandler);
  }
}

export default LocalStorageService;
