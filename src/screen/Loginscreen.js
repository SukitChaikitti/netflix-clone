import React, { useState } from 'react';
import './Loginscreen.css';
import Signinscreen from './Signinscreen';

function Loginscreen() {

    const [signIn , setSignIn] = useState(false);


    return (
        <div className = 'login'>
            <div className = 'login__background'>
                <img alt ='' className = 'login__logo' src = 'http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'/>
                <button onClick = {() => {setSignIn(true)}} className = 'login__button'>Log In</button>
            </div>
            <div className = 'login__gradient'/>
            <div className = 'login__body'>
                {signIn ? (<Signinscreen/>) : (
                    <>
                        <h1>Unlimited films, TV programmes and more.</h1>
                        <h2>Watch anywhere. Cancel at any time.</h2>
                        <h3>Ready to watch ? Enter your email to create or restart your membership</h3>
                        <div className = 'login__input'>
                            <form>
                                <input type = 'email' placeholder = 'Email Address'></input>
                                <button onClick = {() => {setSignIn(true)}} className = 'login__getstarted'>GET STARTED</button>
                            </form>
                        </div>
                    </>
                )}
                
            </div>
            
        </div>
    )
}

export default Loginscreen
