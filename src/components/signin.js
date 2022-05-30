import React from 'react'
import { useState } from 'react'
import '../css/signin.css'
import {
    BrowserRouter as Router, Routes,
    Route,
    Link
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db,provider } from '../firebase';
import { auth } from '../firebase';
import { collection } from 'firebase/firestore';
import { signInWithEmailAndPassword ,signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';

export default function Signin() {
    const [newEmail, setEmail] = useState([]);
    const [newPass, setPassword] = useState([]);
    const usersCollectionRef = collection(db, 'users'); 

    const navigate = useNavigate();
    // e.preventDefault();
    const Signin = () => {
        signInWithEmailAndPassword(auth, newEmail, newPass)
            .then(() => {
                const success = {
                    success: true,
                };
                 toast.success("User Exists", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                })
                console.log('user exists');
                navigate("/dashboard", { replace: true });
                return success;
            })
            .catch((error) => {

                toast.error("Error Accure",{
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });

                console.log(error);
                return -1;
            });
    }
    const signInWithGoogle = () => {

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                const name = result.user.displayName;
                const Email = result.user.email;
                const ProfilePic = result.user.photoURL;
                // ...
                localStorage.setItem("name", name)
                localStorage.setItem("Email", Email)
                localStorage.setItem("Profile Pic", ProfilePic)
                navigate('/dashboard', { replace: true })
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
    
                // const email = error.customData.email;
                
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            })
        }
    return (
        <>
            <div class="flex-container">
                <div class="bg-image1"></div>
                <div className='text1'>
                    <h2 className='h51 w3-animate-left'>Enabling the Hybrid Workforce</h2>
                </div>
                <div className='div1'>
                    <div className='form w3-animate-zoom'>
                        {/* <input type="text" placeholder='Email address or phone number'></input>
                    <input type="password" placeholder='Password' /> */}
                        <input type="email" placeholder='Email address' onChange={(event) => { setEmail(event.target.value) }} id="email" ></input>
                        <input type="text" placeholder='Password' onChange={(event) => { setPassword(event.target.value) }} id="password"></input>
                        <button className='button' onClick={(e) => Signin()}>Sign In</button>
                        <a className='a'>Forgotten password?</a>&nbsp;<Link className="link" to={"/"}>Sign Up</Link>
                        {/* &nbsp;<a className='a' style={{"text-decoration":"Underline"}} href="/signin" src="./signin">Sign in</a> */}
                        <hr></hr>
                        <ToastContainer/>
                        <button className='button1' onClick={(e)=> signInWithGoogle(e)}>Sign in with Google</button>
                    </div>
                    <span className='span1'><a href='#'>Create a Page</a> for a celebrity, brand or business</span>
                </div>

            </div>
        </>
    )
}
