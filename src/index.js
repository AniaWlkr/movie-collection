import './sass/main.scss';
import './button-up/go-up';
import './modal-film-card/modal-film-card';
import './js/switch-page';
import './js/insert_popular_films';
import './js/theme';
import './js/modal-trailer';
import './js/hackers-modal/hackers-modal';
import './authentication/authentication';
import './notifications/notifications';

//отображение лоадера при загрузке страницы
window.addEventListener('load', pageLoading());

function pageLoading() {
  const loader = document.querySelector('.loader');
  loader.className += ' hidden-loader';
}

//--------------------------------------------------------
//---------------------- Раскомментировать чтобы запустить проверку localStorage в тестовом режиме

// import './js/test';

//---------------------- Но перед этим закомментировать import './modal-film-card/modal-film-card';
//---------------------- и всё что ниже констант!
