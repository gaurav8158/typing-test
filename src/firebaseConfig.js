import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD0zoXqIiiSM-i0SdANuqAoBrnCJyEch1E",
    authDomain: "typing-project-cbee6.firebaseapp.com",
    projectId: "typing-project-cbee6",
    storageBucket: "typing-project-cbee6.appspot.com",
    messagingSenderId: "572178709323",
    appId: "1:572178709323:web:1bfec75c4830c75f8186ce",
    measurementId: "G-TKVW2ZKM9J"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
console.log(firebaseApp);
  const auth = firebase.auth();
  const db = firebaseApp.firestore();
  console.log(db);
  export {auth,db};