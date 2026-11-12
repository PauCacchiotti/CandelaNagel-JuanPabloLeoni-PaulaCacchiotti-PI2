import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB7FB4TPcO_Tybm3BAZBrOCNs9doCF6MXM",
  authDomain: "tdm-pi2-redsocial-udesa.firebaseapp.com",
  projectId: "tdm-pi2-redsocial-udesa",
  storageBucket: "tdm-pi2-redsocial-udesa.firebasestorage.app",
  messagingSenderId: "998700299633",
  appId: "1:998700299633:web:b6a08ada075c74bde0b2d0"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();
