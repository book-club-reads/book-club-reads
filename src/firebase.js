import firebase from 'firebase';
// import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA10j5b3AvBUWLkrQx2uLS8glesDcDCPPw",
    authDomain: "book-club-reads.firebaseapp.com",
    databaseURL: "https://book-club-reads.firebaseio.com",
    projectId: "book-club-reads",
    storageBucket: "",
    messagingSenderId: "697990863693",
    appId: "1:697990863693:web:a8c7432ccd5295894d3504"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;