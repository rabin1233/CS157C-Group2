import "../assets/common.css";
import Navbar from 'components/navbar';

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