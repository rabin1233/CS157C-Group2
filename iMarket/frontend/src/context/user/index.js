import React,{useState, useEffect, useCallback} from 'react';
import authcontext from './authcontext';
import axios from 'axios';
const API = 'http://localhost:3001/user';

const AuthContext = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData]= useState({});
    
    useEffect(() => {
        axios.get(`${API}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }).then(({data}) => {
            setUserData(data.user); 
            setIsLoggedIn(data.signin);
        }).catch(err => {
            setIsLoggedIn(false);
            setUserData({})
            console.log(err)
        })

    }, [isLoggedIn]);

    const setLoggedInHandle = (bool) => {
        setIsLoggedIn(bool);  
    }

    const logoutHandle = () => {
        axios.get(`${API}/signout`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }).then(({data}) => {
            setIsLoggedIn(data.signin);
            setUserData({});
        }).catch(err => {
            console.log(err)
        })
    }


    return (
        <authcontext.Provider
            value={{
                userData,
                isLoggedIn,
                setLoggedInHandle,
                logoutHandle
            }}
        >
            {children}
        </authcontext.Provider>
    )
}

export default AuthContext; 