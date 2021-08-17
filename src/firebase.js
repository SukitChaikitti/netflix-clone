import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBCbBmk346qiVCG1hz8Rwr2rTrBbGBUXfQ",
    authDomain: "netflix-clone-4ca41.firebaseapp.com",
    projectId: "netflix-clone-4ca41",
    storageBucket: "netflix-clone-4ca41.appspot.com",
    messagingSenderId: "31473298237",
    appId: "1:31473298237:web:4068b4b7c91da246cb7354"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {auth}
export default db;