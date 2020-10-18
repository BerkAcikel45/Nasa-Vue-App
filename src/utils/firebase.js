import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD-KpM0QVdXpN80KvIybHmYiGwK0O8XjWE",
    authDomain: "nasa-auth.firebaseapp.com",
    databaseURL: "https://nasa-auth.firebaseio.com",
    projectId: "nasa-auth",
    storageBucket: "nasa-auth.appspot.com",
    messagingSenderId: "17747763450",
    appId: "1:17747763450:web:80d87887289a240d2ba943"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')


// export utils/refs
export {
  db,
  auth,
  usersCollection, 
}