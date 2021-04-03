const spinnerElement = document.querySelector('.spinner');

class Spinner {
  constructor(element) {
    this.element = element;
  }
  showSpinner() {
    element.classList.remove('hidden-spinner');
  }

  hideSpinner() {
    element.classList.add('hidden-spinner');
  }
}
const spinner = new Spinner(spinnerElement);

export default spinner;
