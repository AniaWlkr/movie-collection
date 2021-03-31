import movieCard from '../templates/movie-card.hbs';
import MoviesApiService from './api-service/apiService';
import PaginationPlugin from './pagination/pagination';
// import noImage from '../images/movies-card/noimage.jpg'; для заглушки

// екземпляр класу АПІ в подальшому потрібно буде передати зразу в експорт новий екземпляр, щоб код не дублювався у всіх хто працює з АПІ
const moviesApiService = new MoviesApiService();
//--------------------------------------------------------
// константи
const searchForm = document.querySelector('#search-form');
const moviesRef = document.querySelector('.movies-list');
//--------------------------------------------------------
//---Рендер карточок на сторінці(можна передавати ще селектор і виносити в компоненти або утиліти)
function renderCard(arr) {
  moviesRef.innerHTML = '';
  moviesRef.insertAdjacentHTML(
    'beforeend',
    arr.map(query => movieCard(query)).join(''),
  );
}
//--------------------------------------------------------
//функція обробляє і формує коректний обєкт результатів повертає проміс є проблеми коли немає результатів багато помилок проблемні закинув в try catch ще є помилка відсутності картинки
//function insertPopularFilms(results)
function createCorectResult(results) {
  return moviesApiService.getGenresMovies().then(function (genres) {
    //перебираем массив results
    for (let j = 0; j < results.length; j++) {
      let result = results[j]
      //если нету release_date поставь first_air_date
      // let date = result.release.date;
      if (!result.release_date) {
        result.release_date = result.first_air_date;
      }
      if (!result.release_date && !result.first_air_date) {
        result.release_date = "not defined";
      }
      // обрежь дату, оставь год
      // ошибка коли нічого немає ['release_date']
      //try {
      if (result.release_date != "not defined") {
        result.release_date = result.release_date.slice(0, 4)
      };
      // } catch (error) {
      //   console.log(error);
      // }
      
        //если нету original_title поставь original_name, если и его нет - поставь name
      if (!result.original_title) {
        result.original_title = result.original_name;
        if (!result.original_name) {
          result.original_title = result.name
        }
      }

      //создаем пустой массив жанров в объекте массива results
      result.genres = [];
      let genres_exist = false;
      //перебираем id жанров в results и сравниваем их с полученными id из массива ganres, берем name
      //проблема інколи не приходять результати ['genre_ids']
      try {
        for (let i = 0; i < result.genre_ids.length; i++) {
          //найди в массиве жанров id который есть, и если есть - запиши его name в массив жанров фильма
          
            let genre = genres.find(
              genre => genre.id === result.genre_ids[i],
            );
            if (genre) {
              result.genres.push(" " + genre['name']);
              genres_exist = true;
            }
          }
          if (!genres_exist){
            result.genres.push("not defined")
          }
          //обрезает массив жанров до двух первых
          if (result.genres.length > 2) {
            result.genres = result.genres.slice(0, 2);
            result.genres.push(" Other")
          };
        
        //для реализации заглушки
        // if (!result.poster_path) {
        //   result.poster_path = noImage;
        // }
        // else {
        //   result.poster_path = "https://image.tmdb.org/t/p/w500" + result.poster_path
        // }
      } catch (error) {
        result.genres.push("not defined")
        console.log(error);
      }
    }
    return results;
  });
}
//--------------------------------------------------------
// функція популярних фільмів
function renderAndPaginationPopularMovies() {
  //скидання пагінатора
  PaginationPlugin.reset();
  //перший рендер
  moviesApiService.getResponseAll().then(({ data }) => {
    const { results, total_results } = data;
    createCorectResult(results).then(renderCard);
    PaginationPlugin.setTotalItems(total_results);
    PaginationPlugin.on('afterMove', ({ page }) => {
      moviesApiService
        .getResponseAll(page)
        .then(({ data: { results } }) =>
          createCorectResult(results).then(renderCard),
        );
    });
  });
}
//--------------------------------------------------------
// функція пошук по слову
function renderAndPaginationSearchMovies() {
  searchForm.addEventListener('submit', onSearch);
}
//--------------------------------------------------------
function onSearch(event) {
  event.preventDefault();
  //знімаем слушателя на інпут
  //   searchForm.removeEventListener('submit', onSearch);
  PaginationPlugin.reset();

moviesApiService.query = event.currentTarget.elements.query.value;
  moviesApiService.getResponseWord().then(({ data }) => {
    const { results, total_results } = data;
    createCorectResult(results).then(renderCard);
    //добавляем після першого рендеру
    // searchForm.addEventListener('submit', onSearch);
    //------------
    PaginationPlugin.setTotalItems(total_results);
    PaginationPlugin.on('afterMove', ({ page }) => {
      moviesApiService
        .getResponseWord(page)
        .then(({ data: { results } }) =>
          createCorectResult(results).then(renderCard),
        );
    });
  });
}
//--------------------------------------------------------
// функція популярних фільмів
renderAndPaginationPopularMovies();
// функція пошук по слову
renderAndPaginationSearchMovies();