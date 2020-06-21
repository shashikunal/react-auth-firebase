import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const Config = {
  apiKey: "AIzaSyBeEzlZQza1njXH4Y0WOWzhNiFQNdlL1Ow",
  authDomain: "react-auth-3fa9a.firebaseapp.com",
  databaseURL: "https://react-auth-3fa9a.firebaseio.com",
  projectId: "react-auth-3fa9a",
  storageBucket: "react-auth-3fa9a.appspot.com",
  messagingSenderId: "351509580298",
  appId: "1:351509580298:web:e6639d7177474556146df3",
};

firebase.initializeApp(Config);

export default firebase;
