import React, { useReducer, useState } from 'react';
import './App.css';
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import firebaseConfig from './Firebase.Config';
initializeApp(firebaseConfig)

function App() {
  const [user,setUser]=useState({
    isSignIn:false,
    email:"",
    photoURL:"",
    displayName:"",
    errorMessage:""

  }) ;
  const provider = new FacebookAuthProvider();
  const handleSignIn=()=>{
    
    const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;
    const {email,displayName,photoURL} = user?.providerData[0]
    setUser({
      isSignIn:true,
      email:email,
      photoURL:photoURL,
      displayName:displayName,
      errorMessage:""
  
    })
  })
  .catch((error) => {
    // Handle Errors here.
    const errorMessage = error.message;
    setUser(user.errorMessage=errorMessage)
    // ...
  });
  }
  return (
    <div>
      <p>FaceBook and Github Login </p>
      <button onClick={handleSignIn}>Signin Using FaceBook</button>
      <br /><br /><br />
      <img src={user.photoURL} alt="" />
      <p>{user.displayName}</p>
      <p>{user.email}</p>
     {
       user.errorMessage &&<p>{user.errorMessage}</p>
       
     } 
    </div>
  );
}

export default App;
