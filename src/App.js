import React from 'react';
import './App.css';
import Homescreen from './screen/Homescreen';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Loginscreen from './screen/Loginscreen';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import {login ,logout ,selectUser} from './features/userSlice';
import Profilescreen from './screen/Profilescreen';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if(userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }))
      }else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch])

  console.log(user);

  return (
    <div className="app">
      <Router>
        {!user ? 
        <Loginscreen/> : (
          <Switch>
            <Route exact path = '/'>
              <Homescreen/>
            </Route>
            <Route path = '/profile'>
              <Profilescreen/>
            </Route>
            <Route path = '/login'>
              <Homescreen/>
            </Route>
            
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
