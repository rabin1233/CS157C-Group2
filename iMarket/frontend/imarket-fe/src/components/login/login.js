import React, {useState} from 'react'
import { Link, useHistory} from 'react-router-dom'
import axios from 'axios'



const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}

function Login() {

    const [user, setUser] = useState(initialState)
    const history = useHistory()
    const {email, password, err, success} = user


    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/user/login', {email, password})
            setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('firstLogin', true)
            history.push("/loggedIn")

        }
        catch(err)
        {
            /*
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})*/

        }

    }

    return (
        <div >
           
            <form onSubmit={handleSubmit}>
            <div class = "navigationBar">
            <a  href='/'>Home</a>
            <a href="/login">Login/Signup</a>
        </div>
        <div class = "logInCenter">
        <h1>Login Page</h1>
            
                <div class="container">
                    <label htmlFor="email">Email</label>
                    <br></br>
                    <input type="text" placeholder="Enter email address" id="email"
                    value={email} name="email" onChange={handleChangeInput} />
              

                <div>
                
                    <label htmlFor="password">Password</label>
                    <br></br>
                    <input type="password" placeholder="Enter password" id="password"
                    value={password} name="password" onChange={handleChangeInput} />
                
                </div>
                
                <button type="submit" class="registerbtn">Login</button>
                <p>Don't have an account? Join us!<a href="/register">Sign Up</a>.</p>

               </div>
               </div>
            </form>
        </div>
    )
        

    
}
export default Login