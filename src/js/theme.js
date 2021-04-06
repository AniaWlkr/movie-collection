import refs from './refs/refs';

function onChangeTheme() {
  toggleDarkTheme();

  if (document.body.classList.contains('dark-theme')) {
    setIconsDark();
    rememberTheme('dark-theme', 'moon');
    //зміна теми для пагінації
    addPagTheme();
  } else {
    setIconsLight();
    rememberTheme('light-theme', 'sun');
    //зміна теми для пагінації
    removePagTheme();
  }
}

function currentTheme() {
  const sevedTheme = localStorage.getItem('theme');
  const sevedColor = localStorage.getItem('currentIcon');

  if (sevedTheme === 'dark-theme' && sevedColor === 'moon') {
    addDarkTheme();
    setIconsDark();
    //зміна теми для пагінації
    addPagTheme();
  }
}

function addDarkTheme() {
  document.body.classList.add('dark-theme');
  refs.footer.classList.add('dark-theme');
  refs.modalContent.classList.add('dark-theme');
  refs.hackersModal.classList.add('dark-theme');
  refs.hackerModalDeveloper.classList.add('dark-theme');
}

function toggleDarkTheme() {
  document.body.classList.toggle('dark-theme');
  refs.footer.classList.toggle('dark-theme');
  refs.modalContent.classList.toggle('dark-theme');
  refs.hackersModal.classList.toggle('dark-theme');
  refs.hackerModalDeveloper.classList.toggle('dark-theme');
}

function setIconsDark() {
  refs.moonIcon.classList.add('accent-icon');
  refs.sunIcon.classList.remove('accent-icon');
}

function setIconsLight() {
  refs.moonIcon.classList.remove('accent-icon');
  refs.sunIcon.classList.add('accent-icon');
}

function rememberTheme(theme, icon) {
  localStorage.setItem('theme', theme);
  localStorage.setItem('currentIcon', icon);
}

//додаем тему на пагінації
function addPagTheme() {
  const pagBox = document.querySelector('#pagination-box');
  pagBox.children.forEach(element => element.classList.add('dark-theme'));
}
//знімаєм тему на пагінації
function removePagTheme() {
  //селектор бокса пагінації
  const pagBox = document.querySelector('#pagination-box');
  pagBox.children.forEach(element => element.classList.remove('dark-theme'));
}

currentTheme();
refs.checkbox.addEventListener('change', onChangeTheme);
