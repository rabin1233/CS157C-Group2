import React, {useState} from 'react';
//import './register.css'



function Register() {

    return (
        <div> 
            <h1> Register</h1>
          
            <form>
            <div class="form-group">
              <label for="name">Name</label>
              <input type="name" class="form-control" name="username" />
            </div>
                
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" name="usernemail" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" name="password"/>
            </div>
            <button type="submit"  class="btn btn-dark">Register</button>
          </form>
        </div>
    );

}


export default Register;