import goUp from '../utils/goUp'; //import
const buttonUpRef = document.querySelector('.button-up');

buttonUpRef.classList.add('visually-hidden');

const watchScroll = () => {
  const scroll = window.pageYOffset;
  const coords = document.documentElement.clientHeight;

  if (scroll < coords) {
    buttonUpRef.classList.add('visually-hidden');
  }

  if (scroll > coords) {
    buttonUpRef.classList.remove('visually-hidden');
  }
};

buttonUpRef.addEventListener('click', e => goUp());
window.addEventListener('scroll', watchScroll);
