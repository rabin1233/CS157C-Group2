import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Register from './components/register/register';
import Login from './components/login/login';
import Home from './components/home/home';
import User from './components/user/user';
import AuthContext from './context/user/index';
import {Protected, Open} from './AuthRoute';

function App() {
  return (
      <AuthContext>
        <BrowserRouter>
            <Switch>   
                <Route exact path ="/" component ={Home}/>   
                <Open exact path = "/login" component = {Login}/>
                <Open exact path = "/register" component = {Register}/>
                <Protected exact path="/account" component ={User} />
            </Switch>
        </BrowserRouter>
      </AuthContext>
    
  );
}

export default App;