const element = document.querySelector('.spinner');

class Spinner {
  constructor(ref) {
    this.ref = ref;
  }
  showSpinner() {
    this.ref.classList.remove('hidden-spinner');
  }

  hideSpinner() {
    this.ref.classList.add('hidden-spinner');
  }
}
const spinner = new Spinner(element);

export default spinner;
