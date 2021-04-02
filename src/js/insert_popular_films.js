import MoviesApiService from './api-service/apiService';
import PaginationPlugin from './pagination/pagination';
import goUp from './utils/goUp';
import renderCard from './utils/renderCard';
import { newApi } from './api-service/apiService';
import createCorectResult from './utils/createCorectResult';
// import noImage from '../images/movies-card/noimage.jpg';// для заглушки

// екземпляр класу АПІ в подальшому потрібно буде передати зразу в експорт новий екземпляр, щоб код не дублювався у всіх хто працює з АПІ
const moviesApiService = new MoviesApiService();
//--------------------------------------------------------
// константи
const searchForm = document.querySelector('#search-form');
const pagBox = document.querySelector('#pagination-box');
const errorRef = document.querySelector('.search-error');
const headerRef = document.querySelector('header');
//--------------------------------------------------------

//--------------------------------------------------------
//--------------------------------------------------------
// функція для рендеру і пагінації
function renderAndPagination(key) {
  //повертаем проміс
  function getAllMovie(page) {
    return newApi.getResponseAll(page);
    // return moviesApiService.getResponseAll(page);
  }
  //повертаем проміс
  function getSearchWord(page) {
    return newApi.getResponseWord(page);
    // return moviesApiService.getResponseWord(page);
  }
  //берем ссилку на необхідну функцію
  let promise = getAllMovie;
  if (key === 'word') promise = getSearchWord;
  //заготовка під скрол до потрібної сторінки
  //якщо у нас записалась якась сторінка на локал сторадж
  let page = 1;
  // let storadgePage = 2; //Для перевірки наступну строку заоментувати і навпаки
  let storadgePage = 0;
  if (storadgePage !== 1 && storadgePage) page = storadgePage;

  //перший рендер
  promise(page).then(({ data }) => {
    errorRef.classList.add('is-hidden');
    //деструктуризація
    const { results, total_results } = data;
    if (results.length === 0) {
      errorRef.classList.remove('is-hidden');
      return;
    }
    //формує коректний пагінатор
    PaginationPlugin.setTotalItems(total_results);
    PaginationPlugin.reset();
    PaginationPlugin.movePageTo(page);
    changePagTheme();

    //створюєм коректний результат потім рендер

    createCorectResult(results).then(renderCard);
    // createCorectResult(results)
    //   .then(data => {
    //     renderCard(data);
    //   })
    //   //?????????????????????????????????
    //   .catch(error => {
    //     // це все по ідеї ніколи не буде працювати оскільки на вході вже є результати
    //     if (error) {
    //       // виходить ми ловим помилку у функції яка має сформувати коректний результат
    //       console.log(error); //
    //     } //
    //   });
    PaginationPlugin.setTotalItems(total_results);

    //рендери при зміні в пагінації
    PaginationPlugin.on('afterMove', ({ page }) => {
      //зміна теми
      changePagTheme();
      promise(page).then(({ data: { results } }) => {
        createCorectResult(results).then(renderCard);
        //скрол після кліку на верх
        setTimeout(goUp(headerRef), 100);
        // await goUp();
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

  //получаем строку и удаляем пробели
  let query = event.currentTarget.elements.query.value.trim();
  if (!query) {
    errorRef.classList.remove('is-hidden');
    return;
  }
  // moviesApiService.query = query;
  newApi.query = query;
  renderAndPagination('word');
}
//--------------------------------------------------------
//зміна теми для пагінації
function changePagTheme() {
  if (document.body.classList.contains('dark-theme')) {
    pagBox.children.forEach(element => element.classList.add('dark-theme'));
  }
}
//--------------------------------------------------------
// функція популярних фільмів
renderAndPaginationPopularMovies();
// функція пошук по слову
renderAndPaginationSearchMovies();
//-----------------------------------------------------------
//-----------------------------------------------------------
//функция рендерит в My Library просмотренныефильмы и фильмы в очереди
export const renderLibraryFilms = function (arrayOfId) {
  let arr = [];
  arrayOfId.forEach(element => {
    moviesApiService.getResponseInfo(element).then(({ data }) => {
      arr.push(data);
    });
  });
  createCorectResult(arr).then(renderCard);
};
//-----------------------------------------------------------
