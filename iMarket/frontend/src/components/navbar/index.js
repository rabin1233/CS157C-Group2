import {useContext} from 'react';
import "assets/common.css";
import {Link} from 'react-router-dom';

import authcontext from 'context/user/authcontext';
import Button from 'components/common/Button';

const Navbar = () => {
    const {isLoggedIn, logoutHandle} = useContext(authcontext);
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                    iMarket
                    </Link>
                    {!isLoggedIn && (
                        <div>
                            <Link className="navbar_nav" to="login">
                                Login
                            </Link>
                            <Link className="navbar_nav" to="register">
                                Signup
                            </Link>
                        </div>
                    )}
                    {isLoggedIn && (
                        <div>
                            <Link className="navbar_nav_user" to="/postitem">
                                Post
                            </Link>
                            <Link className="navbar_nav_user" to="/account">
                                Account
                            </Link>
                            <Button
                                size="sm"
                                color="danger"
                                onClick={() => logoutHandle()}
                            >
                                Logout
                            </Button>
                        </div>
                    )}
            </div>
        </nav>
    )
}

export default Navbar;