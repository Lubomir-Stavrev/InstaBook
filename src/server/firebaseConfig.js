import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCN6zELjYg4zlzJm6YVgI9bDdA4sLLJFlo",
    authDomain: "instabook-7b05e.firebaseapp.com",
    projectId: "instabook-7b05e",
    storageBucket: "instabook-7b05e.appspot.com",
    messagingSenderId: "673735918424",
    appId: "1:673735918424:web:065a9f9eb57e032806db2d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const storage = firebase.storage();
const userModel = firebase.auth();


export default { storage, userModel };