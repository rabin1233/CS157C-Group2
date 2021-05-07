import "../assets/common.css";
import React from 'react';
import Navbar from '../components/navbar/index';

const MainLayout = ({children}) => {
    return (
        <div className="container-fluid custom_container">
            <Navbar />
            <div className="container custom_container_box">
                {children}
            </div>
        </div>
    )
}

export default MainLayout;