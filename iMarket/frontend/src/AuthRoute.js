import Authcontext from './context/user/authcontext';
import React, {Component, useContext} from 'react';
import ReactDOM from 'react-dom'
import {Route, Redirect } from 'react-router-dom';

export const Protected = ({component: Component, ...rest}) => {
    const {isLoggedIn} = useContext(Authcontext);
    return(
        <Route
            {...rest}
            render={(props) => isLoggedIn ? 
                <Component {...props} /> : <Redirect to={{pathname: "/login", state: {from: props.location}}} /> 
            }
            
        />
    )
}

export const Open = ({component: Component, ...rest}) => {
    const {isLoggedIn} = useContext(Authcontext);
    return(
        <Route
            render={(props) => !isLoggedIn ? 
                <Component {...props} /> : <Redirect to={{pathname: props.location.state ? props.location.state.from.pathname : '/', state: {from: props.location}}} />
            }
        />
    )
}

