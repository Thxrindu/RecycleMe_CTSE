import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAjVpwhwNcRo8bQe0naiQyOFAPCB4vNqOk",
  authDomain: "recycleme-f1a8b.firebaseapp.com",
  projectId: "recycleme-f1a8b",
  storageBucket: "recycleme-f1a8b.appspot.com",
  messagingSenderId: "187237647240",
  appId: "1:187237647240:web:8604ab6dfca3bae45eb03d"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export { firebase };