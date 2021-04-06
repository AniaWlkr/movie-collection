import noImage from '../../images/movies-card/noimage.jpg';
import { newApi } from '../api-service/apiService';
//функція обробляє і формує коректний обєкт результатів повертає проміс є проблеми коли немає результатів багато помилок проблемні закинув в try catch ще є помилка відсутності картинки
//function insertPopularFilms(results)
//если не нужно обрезать жанры - вызовите эту функцию с false: createCorectResult(results, false)

export default function createCorrectResult(results, cutting = true) {
  return new Promise(res => res(...results)).then(function () {
    //перебираем массив results
    results.forEach(result => {
      try {
        //если нет release_date поставь first_air_date
        if (!result.release_date) {
          result.release_date = result.first_air_date;
        }
        if (!result.release_date && !result.first_air_date) {
          result.release_date = 'not defined';
        }
        // обрежь дату, оставь год
        if (result.release_date !== 'not defined') {
          result.release_date = result.release_date.slice(0, 4);
        }

        //если нет original_title поставь original_name, если и его нет - поставь name
        if (!result.original_title) {
          result.original_title = result.original_name;
          if (!result.original_name) {
            result.original_title = result.name;
          }
        }

        let genres_exist = false;
        //перебираем id жанров в results и сравниваем их с полученными id из массива ganres, берем name
        //если приходят фильмы с id жанров (нет названий жанров)
        if (!result.genres) {
          //создаем пустой массив жанров в объекте массива results
          result.genres = [];
          //если есть id жанров
          if (result.genre_ids) {
            result.genre_ids.forEach(id => {
              //найди в массиве жанров id (приходит с API), который есть, и если есть - запиши его name в массив жанров фильма
              let genre = newApi.genresArr.find(genre => genre.id === id);
              if (genre) {
                result.genres.push(' ' + genre['name']);
                genres_exist = true; //нашлось совпадение по id жанров
              }
            });
          } else {
            result.genres.push('not defined');
          }
          if (!genres_exist && result.genre_ids) {
            result.genres.push('not defined');
          }
        }
        //если вместе с фильмом приходит массив с жанрами, достаем название жанра из объекта
        else {
          result.genres.forEach(genre => {
            genre = genre.name;
          });
        }
        //обрезает массив жанров до двух первых
        if (result.genres.length > 2 && cutting) {
          result.genres = result.genres.slice(0, 2);
          result.genres.push(' Other');
        }
        //для реализации заглушки
        if (!result.poster_path) {
          result.poster_path = noImage;
        } else {
          result.poster_path =
            'https://image.tmdb.org/t/p/w500' + result.poster_path;
        }
        result.vote_average = result.vote_average.toFixed(1);
      } catch (error) {
        console.log(error);
      }
    });

    return results;
  });
}
