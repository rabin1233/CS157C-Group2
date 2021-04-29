import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Register from './components/register/register';
import Login from './components/login/login';
import Home from './components/home/home';
import './App.css';

function App() {
  return (
  <div className = "App">
      <BrowserRouter>
      
        <div>
          <Switch>   
              <Route exact path ="/" component ={Home}/>   
              <Route exact path = "/login" component = {Login}/>
              <Route exact path = "/register" component = {Register}/>

          </Switch>
          </div>
          
          </BrowserRouter>
    </div>
    
  );
}

export default App;
