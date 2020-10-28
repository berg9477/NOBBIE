import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

        const fireCon = {
            apiKey: "AIzaSyD_8AQzfoCg84LyqnHywl5QRHolKflfK28",
            authDomain: "nobbiedb.firebaseapp.com",
            databaseURL: "https://nobbiedb.firebaseio.com",
            projectId: "nobbiedb",
            storageBucket: "nobbiedb.appspot.com",
            messagingSenderId: "1021151795976",
            appId: "1:1021151795976:web:e6ba80b930e5b270edaabd",
            measurementId: "G-29W3NQTEV0"

        }
       const firebs = firebase.initializeApp(fireCon)

export default firebs