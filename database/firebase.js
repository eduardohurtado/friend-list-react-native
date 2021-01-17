import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB7qQDz2iof57a9DwGPU2ceujJgL6TIpdo",
    authDomain: "friend-list-react-native.firebaseapp.com",
    projectId: "friend-list-react-native",
    storageBucket: "friend-list-react-native.appspot.com",
    messagingSenderId: "384652927709",
    appId: "1:384652927709:web:6a285dfdf3c5a206c87134",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Database access
const db = firebase.firestore();

export default {
    firebase,
    db,
};
