import React, {Component} from 'react';
import './App.css';
import Landing from './components/Layout/Landing';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import jwt_decode from 'jwt-decode';
import {logoutUser} from './actions/authActions';

//Check for token
if(localStorage.jwtToken){
  // set auth token header
  setAuthToken(localStorage.jwtToken);

  //Decode
  const decoded = jwt_decode(localStorage.jwtToken);
  // dispatch 
  store.dispatch(setCurrentUser(decoded));

  //Check for expiry
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    //Logout user
    store.dispatch(logoutUser());
    //Redirect user
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      


    <Router>
      <div className = "App">
        <Navbar />
        <Route exact path = "/" component = {Landing} />
        
        <div className="container">
          <Route exact path = "/register" component = {Register} />
          <Route exact path = "/login" component = {Login} />
        </div>
        <Footer />
      </div>
    </Router>
    </Provider>
      
    );
  }
}
export default App;
