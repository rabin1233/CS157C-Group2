import {useContext} from 'react';
import MainLayout from 'layout/MainLayout';

import authcontext from 'context/user/authcontext';

const User = () => {
    const {userData} = useContext(authcontext);
    console.log(userData);
    return (
        <MainLayout>
            User
        </MainLayout>
    )
}

export default User;