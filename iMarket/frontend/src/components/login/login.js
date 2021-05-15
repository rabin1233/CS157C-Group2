import "../../assets/common.css";
import React, {useState, useContext} from 'react'
import { Link, useHistory} from 'react-router-dom'
import axios from 'axios';


import MainLayout from '../../layout/MainLayout';
import FormInput from '../common/FormInput';
import Button from '../common/Button';

import authcontext from '../../context/user/authcontext';

const initialState = {
    email: '',
    password: '',
}

function Login() {

    const [user, setUser] = useState(initialState);
    const [error, setError] = useState('');
    const history = useHistory()
    const {email, password} = user;


    const {setLoggedInHandle} = useContext(authcontext);


    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const {data} = await axios.post('http://localhost:3001/user/login', {email, password}, {withCredentials: true})
            setLoggedInHandle(data.signin);
        }
        catch(err)
        {
            setError('Email or password is not correct')
        }

    }

    return (
        <MainLayout >
            <form onSubmit={handleSubmit}>
                <div className="form_container">
                    <h1>Login Page</h1>
                    {error && (
                        <div class="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <FormInput 
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter Your Email Address"
                        value={email}
                        onChange={handleChangeInput}
                        inputHelp={"We dont sell your email"}
                    />
                    <FormInput 
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={handleChangeInput}
                    />
                    <Button
                        color="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                    <br />

                    <p>Don't have an account? Join us! <Link to="/register">Sign Up</Link>.</p>
                </div>
            </form>
        </MainLayout>
    )
        

    
}
export default Login