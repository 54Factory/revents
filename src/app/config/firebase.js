import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDqU2jCLNu7ZBK9Gi7vXqtuUzCsbNQJLyM",
  authDomain: "revents-218808.firebaseapp.com",
  databaseURL: "https://revents-218808.firebaseio.com",
  projectId: "revents-218808",
  storageBucket: "revents-218808.appspot.com",
  messagingSenderId: "419028950071"
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
}

firestore.settings(settings)
export default firebase;