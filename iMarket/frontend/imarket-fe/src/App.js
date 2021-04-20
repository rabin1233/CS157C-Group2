import React from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';  
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';   
import Navbar from "./components/Navbar";
//import Auth from "./components/trash";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <Router>    
          <div className="container">    
            <nav className="navbar navbar-expand-lg navheader">    
              <div className="collapse navbar-collapse" >    
                <ul className="navbar-nav mr-auto"> 
                <li className="nav-item">   
                    <Link to={'/Login'} className="nav-link">Log In</Link>    
                  </li>     
                  <li className="nav-item">   
                    <Link to={'/Signup'} className="nav-link">Sign Up</Link>    
                  </li>    
                </ul>    
              </div>    
            </nav> <br />   
            <Switch>    
              <Route path='/Signup' component={Signup} />    
            </Switch> 
            <Switch>    
              <Route path='/Login' component={Login} />    
            </Switch>
            <Switch>  
            <Route path='/Navbar' component={Navbar} />    
            </Switch> 
          </div>    
        </Router>
  );
}

export default App;
