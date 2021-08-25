import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyBLiBra2rXj5bIOjRgZsV61k2gPAEr_SFs",
  authDomain: "covid-19-tracker-product-82131.firebaseapp.com",
  projectId: "covid-19-tracker-product-82131",
  storageBucket: "covid-19-tracker-product-82131.appspot.com",
  messagingSenderId: "1051985171671",
  appId: "1:1051985171671:web:dedc62ca1faf68bc370c92",
  measurementId: "G-M7DMSLFNPB",
});

export const db = firebase.firestore();

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
