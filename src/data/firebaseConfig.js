import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

/*Value of key and msgID can be found in the .env file, this is hidden for public use in netlify*/
const key = process.env.REACT_APP_API_KEY_frbs
const msgID = process.env.REACT_APP_API_KEY_messagingSenderId

        const fireCon = {
            apiKey: key,
            authDomain: "nobbiedb.firebaseapp.com",
            databaseURL: "https://nobbiedb.firebaseio.com",
            projectId: "nobbiedb",
            storageBucket: "nobbiedb.appspot.com",
            messagingSenderId: msgID,
            appId: "1:1021151795976:web:e6ba80b930e5b270edaabd",
            measurementId: "G-29W3NQTEV0"
        }
       const firebs = firebase.initializeApp(fireCon)

export default firebs
