import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDsmkRDYPr3VuGVUI-DFeBOrKdKtwAwMNc",
    authDomain: "reveal-7eef3.firebaseapp.com",
    projectId: "reveal-7eef3",
    storageBucket: "reveal-7eef3.appspot.com",
    messagingSenderId: "313444230944",
    appId: "1:313444230944:web:fc2c01f8e4e6e961ad1945"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = firebase.firestore()

export { firebase, db }