const refs = {
  checkbox: document.querySelector('#checkbox'),
  sunIcon: document.querySelector('#sun'),
  moonIcon: document.querySelector('#moon'),
  footer: document.querySelector('.footer'),
  modalcontent: document.querySelector('.modal-content'),
  //селектор бокса пагінації
  pagBox: document.querySelector('#pagination-box'),
};

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
  refs.modalcontent.classList.add('dark-theme');
}

function toggleDarkTheme() {
  document.body.classList.toggle('dark-theme');
  refs.footer.classList.toggle('dark-theme');
  refs.modalcontent.classList.toggle('dark-theme');
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
  refs.pagBox.children.forEach(element => element.classList.add('dark-theme'));
}
//знімаєм тему на пагінації
function removePagTheme() {
  refs.pagBox.children.forEach(element =>
    element.classList.remove('dark-theme'),
  );
}

currentTheme();
refs.checkbox.addEventListener('change', onChangeTheme);
