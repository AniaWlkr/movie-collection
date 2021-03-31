import movieCard from '../templates/movie-card.hbs';
import MoviesApiService from './api-service/apiService';
import PaginationPlugin from './pagination/pagination';
// import noImage from '../images/movies-card/noimage.jpg';// для заглушки

// екземпляр класу АПІ в подальшому потрібно буде передати зразу в експорт новий екземпляр, щоб код не дублювався у всіх хто працює з АПІ
const moviesApiService = new MoviesApiService();
//--------------------------------------------------------
// константи
const searchForm = document.querySelector('#search-form');
const moviesRef = document.querySelector('.movies-list');
const pagBox = document.querySelector('#pagination-box');
const errorRef = document.querySelector('.search-error');
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
      let result = results[j]
      //если нет release_date поставь first_air_date
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
      
        //если нет original_title поставь original_name, если и его нет - поставь name
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
    errorRef.classList.add('is-hidden');
    //деструктуризація
    const { results, total_results } = data;
    if (results.length === 0) {
      errorRef.classList.remove('is-hidden');
      return;
  }
    //створюєм коректний результат потім рендер
    createCorectResult(results)
      .then(data => {
        renderCard(data);
      })
      .catch(error => {
        if (error) {
        console.log(error);
        }
      })
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
  //получаем строку и удаляем пробели
  let query = event.currentTarget.elements.query.value.trim();
  if (!query) {
    errorRef.classList.remove('is-hidden');
    return;
  }
  moviesApiService.query = query;
  renderAndPagination('word');
}
//--------------------------------------------------------
// функція популярних фільмів
renderAndPaginationPopularMovies();
// функція пошук по слову
renderAndPaginationSearchMovies();
//-----------------------------------------------------------
//-----------------------------------------------------------
