import React,{useContext} from 'react';

import MainLayout from '../../layout/MainLayout';

import authcontext from '../../context/user/authcontext';

const User = () => {
    const {userData} = useContext(authcontext);
    return (
        <MainLayout>
            ....
        </MainLayout>
    )
}

export default User;