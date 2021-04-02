const element = document.querySelector('.spinner');

export default class Spinner {
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
const spinner = new Spinner(element);
