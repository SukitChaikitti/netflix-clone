import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import Nav from '../Nav';
import Planscreen from './Planscreen';
import './Profilescreen.css';

function Profilescreen() {

    const user = useSelector(selectUser);

    return (
        <div className = 'profile'>
            <Nav/>
            <div className = 'profile__body'>
                <h1>Edit Profile</h1>
                <div className = 'profile__info'>
                    <img alt = '' src = 'https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png'/>
                    <div className = 'profile__details'>
                        <h2>{user.email}</h2>
                        <div className = 'profile__plans'>
                            <h2>Plans</h2>
                            <Planscreen/>
                            <button onClick = {() => {auth.signOut()}} className = 'profile__signout'>Sign Out</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profilescreen
