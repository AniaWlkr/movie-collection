import "firebase/firestore"
import firebase from "firebase/app"
// import testArr from "../js/testArrOfFilm"

const firebaseConfig = {
  apiKey: "AIzaSyBiHdaWfvwyvoYxWZf-_03i0QWMg8B_5K8",
  authDomain: "movies-collection-9512d.firebaseapp.com",
  projectId: "movies-collection-9512d",
  storageBucket: "movies-collection-9512d.appspot.com",
  messagingSenderId: "603974741827",
  appId: "1:603974741827:web:12ebfe96e19b2611f209f6"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const moviesRef = db.collection('movies').doc('moviesList');

moviesRef.set({ watched: [], queue: [] });

function updateWatched(obj) {
  const dataString = JSON.stringify(obj);
  moviesRef.update({ watched: firebase.firestore.FieldValue.arrayUnion(dataString)});
}

function updateQueue(obj) {
  const dataString = JSON.stringify(obj);
  moviesRef.update({ queue: firebase.firestore.FieldValue.arrayUnion(dataString) });
}

function getMoviesLibraryList() {
    moviesRef.get().then((doc) => {
      if (doc.exists) {
        const movies = doc.data();
        return movies;
      } else {
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
}


export { updateWatched, updateQueue, getMoviesLibraryList };
  
//test

// function addToDB(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     if (i % 2 !== 0) {
//       updateWatched(JSON.stringify(arr[i]));
//       console.log(JSON.stringify(arr[i]));
//     } else {
//       updateQueue(JSON.stringify(arr[i]));
//       console.log(JSON.stringify(arr[i]));
//     }
//   }
// }

// addToDB(testArr);


