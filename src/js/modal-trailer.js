import MoviesApiService from './api-service/apiService';
const moviesApiService = new MoviesApiService();

const btnTrailerRef = document.querySelector('.modal-content');
const modalTrailerRef = document.querySelector('.modal-overlay-trailer');

function onOpenTrailer(event) {
  const movieId = event.target.dataset.sourse;

  if (event.target.className !== 'modal-card-button trailer-btn') {
    return;
  }
  moviesApiService
    .getTrailer(movieId)
    .then(({ data: { results } }) => {
      const trailerKey = results[0].key;

      const markupModalTrailer = `<div class="modal-backdrop" >
                    <div class="modal-container">
                         <iframe src="https://www.youtube.com/embed/${trailerKey}" class="trailer" frameborder="0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                         allowfullscreen>
                          </iframe>
                   </div>
                  </div >`;
      modalTrailerRef.insertAdjacentHTML('beforeend', markupModalTrailer);

      document.body.classList.add('show-trailer');
    })
    .catch(error => {
      console.log(error);
    });
}

function onCloseTrailer(event) {
  if (event.target) {
    document.body.classList.remove('show-trailer');
  }
}

btnTrailerRef.addEventListener('click', onOpenTrailer);
modalTrailerRef.addEventListener('click', onCloseTrailer);
