import "../../assets/common.css";
import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

import MainLayout from '../../layout/MainLayout';
import FormInput from '../common/FormInput';
import Button from '../common/Button';


const initialState = {
    name: '',
    email: '',
    password: '',
}

const isEmpty = value => {
    if(!value) return true
     return false
}

 const isEmail = email => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

 const isLength = password => {
    if(password.length < 8) return true
    return false
}

 const isMatch = (password, cf_password) => {
    if(password === cf_password) return true
    return false
}



function Register() {

    const [user, setUser] = useState(initialState);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('')
    const {name,email,password} = user;

    const history = useHistory();

    const handleChangeInput = e => {
        setError('');
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async (e)=> {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(email) || isEmpty(password))
                return setUser({...user, err: "Please fill in all fields.", success: ''})

        if(!isEmail(email))
                return setUser({...user, err: "Invalid emails.", success: ''})
    
        if(isLength(password))
                return setUser({...user, err: "Password must be at least 8 characters.", success: ''})
        try{
            await axios.post('http://localhost:3001/user/register', {
                name, email, password
            });
            setMessage('User has been created. Please go to login');
            setTimeout(() => {
                setMessage('');
                history.push('/login')
            }, 5000)
        }
        catch(err){
            setError('Something went wrong please try again later');
        }
    }


    return (
        <MainLayout> 
            <form action ="/login" onSubmit={handleSubmit}>
                <div className = "form_container">
                <h1> Register </h1>

                <p> Please fill in the form to create an account.</p>
                {message && (
                    <div className="alert alert-success" role="alert" onClick={() => setMessage('')}>
                        {message}
                    </div>
                )}
                {error && (
                    <div className="alert alert-danger" role="alert" onClick={() => setError('')}>
                        {error}
                    </div>
                )}
                <FormInput 
                    label="Full Name"
                    name="name"
                    type="text"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={handleChangeInput}
                />
                <FormInput 
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter Your Email Address"
                    value={email}
                    onChange={handleChangeInput}
                />
                <FormInput 
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={handleChangeInput}
                    inputHelp={"Password must be 8 character"}
                />
            
                <p>By creating an account you agree to our <a href="">Terms & Privacy</a>.</p>
                <Button
                        color="success"
                        type="submit"
                    >
                        Register
                </Button>
                <p>Already have an account? <Link to="/login">Log in</Link>.</p>
            </div>
          </form>
         
        </MainLayout>
    );

}


export default Register;