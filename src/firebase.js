import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCKNdX26kUGrF9Xf-FNEPNBItzCKE22tK0",
  authDomain: "im-app-1995.firebaseapp.com",
  projectId: "im-app-1995",
  storageBucket: "im-app-1995.appspot.com",
  messagingSenderId: "1039152374419",
  appId: "1:1039152374419:web:26e9e8491d1ce69c972366"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;