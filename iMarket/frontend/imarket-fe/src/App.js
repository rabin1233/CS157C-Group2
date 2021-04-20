import logo from './logo.svg';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Register from './Register';
import './App.css';

function App() {
  return (
  <div>
      <BrowserRouter>
      
        <div>
          <Switch>   
              <Route exact path ="/register" component ={Register}/>   
          </Switch>
          </div>
          
          </BrowserRouter>
    </div>
    
  );
}

export default App;
