import React from 'react';
import { Link } from 'react-router-dom';
// import { UserContext } from './auth/UserContext.js';
import './NavBar.css';

function NavBar({ currentUser, logout }) {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/courses">Courses</Link></li>
                {/* Show "Logout" if a user is logged in, otherwise show "Login" */}
                {currentUser ? (
                    <li>
                        <button onClick={logout}>Logout</button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Sign Up</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;
