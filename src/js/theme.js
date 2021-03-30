const refs = {
  checkbox: document.querySelector('#checkbox'),
  sunIcon: document.querySelector('#sun'),
  moonIcon: document.querySelector('#moon'),
  //селектор бокса пагінації
  pagBox: document.querySelector('#pagination-box'),
};

refs.checkbox.addEventListener('change', onChangeTheme);

currentTheme();

function onChangeTheme() {
  document.body.classList.toggle('dark-theme');

  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark-theme');
    refs.sunIcon.classList.remove('accent-icon');
    refs.moonIcon.classList.add('accent-icon');
    localStorage.setItem('currentIcon', 'moon');
    //зміна теми для пагінації
    addPagTheme();
  } else {
    localStorage.setItem('theme', 'light-theme');
    refs.moonIcon.classList.remove('accent-icon');
    refs.sunIcon.classList.add('accent-icon');
    localStorage.setItem('currentIcon', 'sun');
    //зміна теми для пагінації
    removePagTheme();
  }
}

function currentTheme() {
  const sevedTheme = localStorage.getItem('theme');
  const sevedColor = localStorage.getItem('currentIcon');

  if (sevedTheme === 'dark-theme' && sevedColor === 'moon') {
    document.body.classList.add('dark-theme');
    refs.moonIcon.classList.add('accent-icon');
    refs.sunIcon.classList.remove('accent-icon');
    refs.checkbox.checked = true;
    //зміна теми для пагінації
    addPagTheme();
  } else {
    refs.checkbox.checked = false;
    //зміна теми для пагінації
    removePagTheme();
  }
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
