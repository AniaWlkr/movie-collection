//---Cкрол на верх до хедера при зміні сторінки при пагінації-потім винести у утиліти
const goUp = selector => {
  let heigth = 0;
  if (selector) heigth = selector.clientHeight;
  const heigthHeader = document.querySelector('header').clientHeight;
  window.scrollTo({
    top: heigth,
    right: 0,
    behavior: 'smooth',
  });
};
export default goUp;
