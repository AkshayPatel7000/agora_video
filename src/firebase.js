// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from '@firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
// import { useNavigate } from 'react-router-dom';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyANeZF2VnmSsFXXCtPvAuU60i3pvcc63Xc",
    authDomain: "video-meeting-b16c6.firebaseapp.com",
    projectId: "video-meeting-b16c6",
    storageBucket: "video-meeting-b16c6.appspot.com",
    messagingSenderId: "255787031189",
    appId: "1:255787031189:web:41322b02feb518ced8199c",
    measurementId: "G-WMXQDBX6EL"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();


// export const signInWithGoogle = () => {

//     signInWithPopup(auth, provider)
//         .then((result) => {

//             const navigate = useNavigate();
//             // This gives you a Google Access Token. You can use it to access the Google API.
//             const credential = GoogleAuthProvider.credentialFromResult(result);
//             const token = credential.accessToken;
//             // The signed-in user info.
//             const user = result.user;
//             const name = result.user.displayName;
//             const Email = result.user.email;
//             const ProfilePic = result.user.photoURL;
//             // ...
//             localStorage.setItem("name", name)
//             localStorage.setItem("Email", Email)
//             localStorage.setItem("Profile Pic", ProfilePic)
//             navigate('/dashboard', { replace: true })
//         }).catch((error) => {
//             // Handle Errors here.
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // The email of the user's account used.

//             // const email = error.customData.email;

//             // The AuthCredential type that was used.
//             const credential = GoogleAuthProvider.credentialFromError(error);
//             // ...
//         })
// }


// const analytics = getAnalytics(app);
