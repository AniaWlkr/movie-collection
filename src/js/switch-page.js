
const refs = {
  header: document.querySelector(".header"),
  navigationList: document.querySelector(".navigation-list"),
  searchFofm: document.querySelector(".search-form"),
  tabs: document.querySelector(".tabs"),
};

const changeMarkup = (page) => {

   const activePageState = page.dataset.state;

    if (activePageState === 'home') {
    refs.header.classList.add('header');
    refs.header.classList.remove('header-library');
    refs.searchFofm.classList.remove('is-hidden');
    refs.tabs.classList.add('is-hidden');
  }

  if (activePageState === 'library') {
    refs.header.classList.add('header-library');
    refs.header.classList.remove('header');
    refs.searchFofm.classList.add('is-hidden');
    refs.tabs.classList.remove('is-hidden');
  }
}

const pageSwitcher = (event) => {
  event.preventDefault();

  if (event.target.nodeName !== 'A') return;

  const prevActivePage = refs.navigationList.querySelector (".current");
  
  if (prevActivePage) {
    prevActivePage.classList.remove("current")
  };

  const currentActivePage = event.target;
  currentActivePage.classList.add("current");

  changeMarkup(currentActivePage);
}

refs.navigationList.addEventListener('click', pageSwitcher);