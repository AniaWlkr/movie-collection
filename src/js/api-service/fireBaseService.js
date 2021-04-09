import firebase from 'firebase/app';
import axios from 'axios';
import 'firebase/auth';
import 'firebase/database';
const filterBox = document.querySelector('.filter-container');
const libraryRef = document.querySelector(
  '.navigation-link[data-state="library"]',
);
class FireBase {
  constructor() {
    //тестова БД оскільки до спільної немаю доступу
    this.apiKey = 'AIzaSyC_Bp9v-H2PsbVdod7pJZSjv47jAEjR_Mo'; //<-----тестовий АПІ-ключ
    // this.apiKey = 'AIzaSyB60t6UrbfMCgI7czaAVFUumbYPsz4Lbec'; //<-----основний АПІ-ключ
    this.dataBase = 'https://test-85a9b-default-rtdb.firebaseio.com/'; //<-----немає доступу не знаю проект
    this.userId = null;
    this.token = null;
    this.init();
  }
  //вихід користувача
  signOut() {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          // filterBox.classList.add('visually-hidden');
          libraryRef.classList.add('visually-hidden');
          localStorage.setItem('token', '');
        },
        function (error) {
          console.error('Sign Out Error', error);
        },
      );
  }
  async setDataToDB(obj) {
    await axios.delete(
      `${this.dataBase}/users/${this.userId}/movies.json?auth=${this.token}`,
    );
    await axios.post(
      `${this.dataBase}/users/${this.userId}/movies.json?auth=${this.token}`,
      obj,
    );
  }
  async getDataFromDB(id, token) {
    const response = await axios.get(
      `${this.dataBase}/users/${id}/movies.json?auth=${token}`,
    );
    return response;
  }
  //запуск
  init() {
    firebase.initializeApp({
      apiKey: this.apiKey,
      authDomain: 'test-85a9b.firebaseapp.com',
      databaseURL: this.dataBase,
      projectId: 'test-85a9b',
      storageBucket: 'test-85a9b.appspot.com',
    });
    //ховаєм лишній функціонал

    // filterBox.classList.add('visually-hidden');
    libraryRef.classList.add('visually-hidden');
  }
}
const newFireBase = new FireBase();
export default newFireBase;
