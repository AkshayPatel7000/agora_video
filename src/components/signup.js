import React from 'react'
import { useState } from 'react'
import {
    BrowserRouter as Router, Routes,
    Route,
    Link
} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { db, provider } from '../firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import '../css/signup.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, signInWithGoogle } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import Dashboard from './Dashboard';
// import { useHistory } from 'react-router-dom';


export default function Signup() {

    const [newName, setName] = useState([]);
    const [newEmail, setEmail] = useState([]);
    const [newPhone, setPhone] = useState([]);
    const [newPass, setPass] = useState([]);
    const connectionRef = collection(db, 'users')
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });
    const navigate = useNavigate();
    const createUsers = async () => {
        createUserWithEmailAndPassword(auth, newEmail, newPass)
            .then(() => {
                const success = {
                    success: true,

                };
                toast.success("Successfully Register", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                })
                navigate('/dashboard', { replace: true })
                console.log('Success');
                return success;
            })
            .catch((error) => {
                toast.error("Error Accure", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
                // alert('Invalid email or password.');
                console.log(error);
                return -1;
            });

        await onSnapshot(addDoc(connectionRef, { name: newName, phone: Number(newPhone), email: newEmail, password: newPass }))

        console.log("first")

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
        <div class="flex-container">

            <div class="bg-image"></div>
            <div className='text w3-animate-opacity'>
                {/* <br></br> */}
                <h2 className='h5 w3-animate-left'>Design More Engaging Virtual Events</h2>
            </div>
            <div className='div w3-animate-right'>
                <div className='form'>
                    {/* <input type="text" placeholder='Email address or phone number'></input>
                    <input type="password" placeholder='Password' /> */}
                    <input type="text" placeholder='Name' onChange={(event) => { setName(event.target.value) }} id="name" ></input>
                    <input type="email" placeholder='Email address' onChange={(event) => { setEmail(event.target.value) }} id="email"></input>
                    <input type="number" placeholder='Phone Number' onChange={(event) => { setPhone(event.target.value) }} id="phone"></input>
                    <input type="text" placeholder='Your Password' onChange={(event) => { setPass(event.target.value) }} id="password"></input>
                    {/* <Link className="link" to={"/dashboard"}><button className='button' onClick={(e) => { createUsers(e) }}>Sign Up</button></Link> */}
                    <button className='button' onClick={(e) => { createUsers(e) }}>Sign Up</button>
                    <ToastContainer />
                    <a className='a'>Forgotten password?</a>&nbsp;<Link className="link" to={"/Signin"}>Sign In</Link>
                    {/* &nbsp;<a className='a' style={{"text-decoration":"Underline"}} href="/signin" src="./signin">Sign in</a> */}
                    <hr></hr>
                    <button className='button1' onClick={(e)=>{signInWithGoogle(e)}}>Sign in with Google</button>
                </div>
                <span className='span'><a href='#'>Create a Page</a> for a celebrity, brand or business</span>
            </div>

        </div>

    )
}
