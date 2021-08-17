import React, { useRef } from 'react';
import { auth } from '../firebase';
import './Signinscreen.css';

function Signinscreen() {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    

    const register = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((user) => {
            console.log(user);
        }).catch((err) => {
            alert(err.message);
        })
    }

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((user) => {
            console.log(user)
        }).catch((err) => {
            alert(err.message)
        })
    }

    return (
        <div className = 'signinscreen'>
            <form>
                <h1>Sign In</h1>
                <input ref = {emailRef} placeholder = 'Email' type = 'email'></input>
                <input ref = {passwordRef} placeholder = 'Password' type = 'password'></input>
                <button type = 'submit' onClick = {signIn}>Sign In</button>
                <h4><span className = 'signinscreen__gray'>New to Netflix? </span><span className = 'signinscreen__link' onClick = {register}>Sign up now.</span></h4>
            </form>
            
        </div>
    )
}

export default Signinscreen
