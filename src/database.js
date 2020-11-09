import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCHNlf6Tm0kBC36Owks5T29ZwPR8AjsR1g",
  authDomain: "instagram-clone-54f9c.firebaseapp.com",
  databaseURL: "https://instagram-clone-54f9c.firebaseio.com",
  projectId: "instagram-clone-54f9c",
  storageBucket: "instagram-clone-54f9c.appspot.com",
  messagingSenderId: "366723587584",
  appId: "1:366723587584:web:c1002a1c3a4bb0700bc2e5",
  measurementId: "G-01664MZMD3",
});

const auth = firebase.auth();

const db = firebaseApp.firestore();

const storage = firebase.storage();

export { db, storage, auth };
