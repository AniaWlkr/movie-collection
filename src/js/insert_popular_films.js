import movieCard from '../templates/movie-card.hbs';
import MoviesApiService from './api-service/apiService';
import PaginationPlugin from './pagination/pagination';

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
      //если нету release_date поставь first_air_date
      if (!results[j]['release_date']) {
        results[j]['release_date'] = results[j]['first_air_date'];
      }
      //обрежь дату, оставь год
      //ошибка коли нічого немає ['release_date']
      try {
        results[j]['release_date'] = results[j]['release_date'].slice(0, 4);
      } catch (error) {
        console.log(error);
      }

      //если нету original_title поставь original_name
      if (!results[j]['original_title']) {
        results[j]['original_title'] = results[j]['original_name'];
      }

      //создаем пустой массив жанров в объекте массива results
      results[j]['genres'] = [];
      //перебираем id жанров в results и сравниваем их с полученными id из массива ganres, берем name
      //проблема інколи не приходять результати ['genre_ids']
      try {
        for (let i = 0; i < results[j]['genre_ids'].length; i++) {
          //найди в массиве жанров id который есть, и если есть - запиши его name в массив жанров фильма
          let genre = genres.find(
            genre => genre.id === results[j]['genre_ids'][i],
          );
          if (genre) {
            results[j]['genres'].push(genre['name']);
          }
          // обрезает массив жанров до двух первых
          // if (results[j]["genres"].length > 2) {
          //     results[j]["genres"] = results[j]["genres"].slice(0, 2);
          // };
        }
      } catch (error) {
        console.log(error);
      }
    }
    // рендер карточок в окремій функції
    // refs.movieList.insertAdjacentHTML(
    //   'beforeend',
    //   results.map(result => movieCard(result)).join(''),
    // );
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
