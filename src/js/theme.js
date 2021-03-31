const refs = {
  checkbox: document.querySelector('#checkbox'),
  sunIcon: document.querySelector('#sun'),
  moonIcon: document.querySelector('#moon'),
};

function onChangeTheme() {
  document.body.classList.toggle('dark-theme');

  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark-theme');
    setIconsDark();
    rememberTheme('dark-theme', 'moon');
  } else {
    localStorage.setItem('theme', 'light-theme');
    setIconsLight();
    rememberTheme('light-theme', 'sun');
  }
}

function currentTheme() {
  const sevedTheme = localStorage.getItem('theme');
  const sevedColor = localStorage.getItem('currentIcon');

  if (sevedTheme === 'dark-theme' && sevedColor === 'moon') {
    document.body.classList.add('dark-theme');
    setIconsDark();
  }
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

currentTheme();
refs.checkbox.addEventListener('change', onChangeTheme);
