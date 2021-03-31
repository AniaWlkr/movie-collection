import MoviesApiService from './api-service/apiService';
const moviesApiService = new MoviesApiService();

const refs = {
  btnTrailer: document.querySelector('.modal-content'),
  modalTrailer: document.querySelector('.modal-overlay-trailer'),
};

function onOpenTrailer(event) {
  const movieId = event.target.dataset.sourse;

  if (event.target.className !== 'modal-card-button trailer-btn') {
    return;
  }
  moviesApiService
    .getTrailer(movieId)
    .then(({ data: { results } }) => {
      const trailerKey = results[0].key;

      refs.modalTrailer.innerHTML = '';
      const markupModalTrailer = `<div class="modal-backdrop" >
                    <div class="modal-container">
                         <iframe src="https://www.youtube.com/embed/${trailerKey}" class="trailer" frameborder="0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                         allowfullscreen>
                          </iframe>
                   </div>
                  </div >`;
      createHTML(markupModalTrailer);
    })
    .catch(error => {
      const markupModalImage = `<div class="modal-backdrop" >
      <div class="modal-container">
      <img src="https://linuxliaison.org/wp-content/uploads/2017/10/Screenshot-from-2017-10-16-23-05-56.png" class="trailer" />
      </div>
      </div >`;

      createHTML(markupModalImage);
      console.log(error);
    });
}

function onCloseTrailer(event) {
  if (event.target) {
    document.body.classList.remove('show-trailer');
    refs.modalTrailer.innerHTML = '';
  }
}
function createHTML(murkup) {
  refs.modalTrailer.insertAdjacentHTML('beforeend', murkup);
  refs.modalTrailer.classList.add('show-trailer');
}

refs.btnTrailer.addEventListener('click', onOpenTrailer);
refs.modalTrailer.addEventListener('click', onCloseTrailer);
