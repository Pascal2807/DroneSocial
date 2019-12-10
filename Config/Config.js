import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAol4SUYoPRlTM6KKsVrHxhoPpVFtSWkj0",
    authDomain: "dronemedia-58f1c.firebaseapp.com",
    databaseURL: "https://dronemedia-58f1c.firebaseio.com",
    projectId: "dronemedia-58f1c",
    storageBucket: "dronemedia-58f1c.appspot.com",
    messagingSenderId: "880069703151",
    appId: "1:880069703151:web:5c7666c4b799265b7f321a",
    measurementId: "G-WJWVGB20JB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();