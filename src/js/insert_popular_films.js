import movieCard from '../templates/movie-card.hbs';
import MoviesApiService from './api-service/apiService';
import PaginationPlugin from './pagination/pagination';

// екземпляр класу АПІ в подальшому потрібно буде передати зразу в експорт новий екземпляр, щоб код не дублювався у всіх хто працює з АПІ
const moviesApiService = new MoviesApiService();
//--------------------------------------------------------
// константи
const searchForm = document.querySelector('#search-form');
const moviesRef = document.querySelector('.movies-list');
const pagBox = document.querySelector('#pagination-box');
//--------------------------------------------------------
//---Рендер карточок на сторінці(можна передавати ще селектор і виносити в компоненти або утиліти)
function renderCard(arr) {
  moviesRef.innerHTML = '';
  moviesRef.insertAdjacentHTML(
    'beforeend',
    arr.map(query => movieCard(query)).join(''),
  );
}
//---Cкрол на верх до хедера при зміні сторінки при пагінації-потім винести у утиліти
const goUp = () => {
  const heigthHeader = document.querySelector('header').clientHeight;
  window.scrollTo({
    top: heigthHeader,
    right: 0,
    behavior: 'smooth',
  });
};
//--------------------------------------------------------
//функція обробляє і формує коректний обєкт результатів повертає проміс є проблеми коли немає результатів багато помилок проблемні закинув в try catch ще є помилка відсутності картинки
//function insertPopularFilms(results)
function createCorectResult(results) {
  return moviesApiService.getGenresMovies().then(function (genres) {
    //перебираем массив results
    for (let j = 0; j < results.length; j++) {
      // console.log(results[j]);
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
    //повертаем оброблений масив результатів
    return results;
  });
}
//--------------------------------------------------------
// функція для рендеру і пагінації
function renderAndPagination(key) {
  //повертаем проміс
  function getAllMovie(page) {
    return moviesApiService.getResponseAll(page);
  }
  //повертаем проміс
  function getSearchWord(page) {
    return moviesApiService.getResponseWord(page);
  }
  //берем ссилку на необхідну функцію
  let promise = getAllMovie;
  if (key === 'word') promise = getSearchWord;
  //скидання пагінатора
  PaginationPlugin.reset();
  //перший рендер
  promise().then(({ data }) => {
    //деструктуризація
    const { results, total_results } = data;
    //створюєм коректний результт потім рендер
    createCorectResult(results).then(renderCard);
    PaginationPlugin.setTotalItems(total_results);
    //рендери при зміні в пагінації
    PaginationPlugin.on('afterMove', ({ page }) => {
      //зміна теми
      if (document.body.classList.contains('dark-theme')) {
        pagBox.children.forEach(element => element.classList.add('dark-theme'));
        // pagBox.classList.add('dark-theme');
      }
      promise(page).then(({ data: { results } }) => {
        createCorectResult(results).then(renderCard);
        //скрол після кліку на верх
        setTimeout(goUp(), 100);
      });
    });
  });
}
//--------------------------------------------------------
// функція популярних фільмів
function renderAndPaginationPopularMovies() {
  renderAndPagination();
}
//--------------------------------------------------------
// функція пошук по слову
function renderAndPaginationSearchMovies() {
  searchForm.addEventListener('submit', onSearch);
}
//--------------------------------------------------------
function onSearch(event) {
  event.preventDefault();
  moviesApiService.query = event.currentTarget.elements.query.value;
  renderAndPagination('word');
}
//--------------------------------------------------------
// функція популярних фільмів
renderAndPaginationPopularMovies();
// функція пошук по слову
renderAndPaginationSearchMovies();
//-----------------------------------------------------------
//-----------------------------------------------------------
