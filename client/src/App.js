import React from 'react';
import './App.css';
import Landing from './components/Layout/Landing';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {BrowserRouter as Router, Route} from 'react-router-dom';



function App() {
  return (
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

    
  );
}

export default App;
