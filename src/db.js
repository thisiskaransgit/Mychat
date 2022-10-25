import firebase from "firebase/compat/app";
import database from 'firebase/compat/database'
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAMODMS5waETDJWxirtHdC9_pmEaOHUpWc",
  authDomain: "mychat-ff55f.firebaseapp.com",
  projectId: "mychat-ff55f",
  storageBucket: "mychat-ff55f.appspot.com",
  messagingSenderId: "357001801884",
  appId: "1:357001801884:web:10a4331844a799a3fb3d59",
};

const db = firebase.initializeApp(firebaseConfig);

const auth = getAuth(db)
export default {
  db,
  auth
};
