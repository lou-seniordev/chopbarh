import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQ4B7Q7d29edQADk23ZXHaQ4qMHxPeOgw",
  authDomain: "dev-sample-31348.firebaseapp.com",
  databaseURL: "https://dev-sample-31348.firebaseio.com",
  projectId: "dev-sample-31348",
  storageBucket: "dev-sample-31348.appspot.com",
  messagingSenderId: "786153963751",
  appId: "1:786153963751:web:9afa5dffb89f3656"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;
