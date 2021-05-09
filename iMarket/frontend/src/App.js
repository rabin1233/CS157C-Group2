import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Register from 'components/register/register';
import Login from 'components/login/login';
import Home from 'components/home/home';
import User from 'components/user/user';
import PostItem from 'components/postItem/postItem';
import UserItem from 'components/user/UserItem';

import AuthContext from 'context/user';
import ItemProvider from 'context/data';
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
                  <Route exact path = "/items/:userId" component = {UserItem}/>
              </Switch>
          </BrowserRouter>
        </ItemProvider>
      </AuthContext>
    
  );
}

export default App;