import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDg3Aa-rBguYRt-3UwbjNVFakvQOotCk4Q",
    authDomain: "friendsapp-8da80.firebaseapp.com",
    projectId: "friendsapp-8da80",
    storageBucket: "friendsapp-8da80.appspot.com",
    messagingSenderId: "153516969072",
    appId: "1:153516969072:web:54b1982d670a5284c2b8b5"
};

const firebaseApp =
    !firebase.apps.length ?
        firebase.initializeApp(firebaseConfig) :
        firebase.app();

const db = firebaseApp.firestore()
export default db;



