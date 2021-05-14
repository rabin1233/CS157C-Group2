import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Register from './components/register/register';
import Login from './components/login/login';
import Home from './components/home/home';
import User from './components/user/user';
import PostItem from './components/postItem/postItem';
import UserItem from './components/user/UserItem';
import StoreItem from './components/storeItem/storeItem';

import AuthContext from './context/user/index';
import ItemProvider from './context/data/index';
import {Protected, Open} from './AuthRoute';


function App() {
  return (
      <AuthContext>
        <ItemProvider>
          <BrowserRouter>
              <Switch>   
                  <Route exact path ="/" component ={Home}/>   
                  <Open exact path = "/login" component = {Login}/>
                  <Open exact path = "/register" component = {Register}/>
                  <Protected exact path="/account" component ={User} />
                  <Protected exact path="/postitem" component ={PostItem} />
                  <Protected exact path="/storeitem" component ={StoreItem} />
                  <Route exact path = "/items/:userId" component = {UserItem}/>
              </Switch>
          </BrowserRouter>
        </ItemProvider>
      </AuthContext>
  
  );
}

export default App;