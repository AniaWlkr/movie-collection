const refs = {
  headerHome: document.querySelector(".header"),
  headerLibrary: document.querySelector(".header-library"),
  navigationList: document.querySelector(".navigation-list"),
};

const pageSwitcher = (event) => {
  event.preventDefault();

  if (event.target.nodeName !== 'A') return;

  const isActivelink = event.target.dataset.page;

  if (isActivelink === 'home') {
    refs.headerHome.classList.remove('is-hidden');
    refs.headerLibrary.classList.add('is-hidden');
  }

  if (isActivelink === 'library') {
    refs.headerHome.classList.add('is-hidden');
    refs.headerLibrary.classList.remove('is-hidden');
  }
}

refs.navigationList.addEventListener('click', pageSwitcher)