import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'

function Nav() {
    return (
        <nav> 
            <h3>Atlas of Population Genetics</h3>
            <ul className="nav-links">
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/about">
                    <li>About</li>
                </Link>
                <Link to="/resources">
                    <li>Resources</li>
                </Link>
                <Link to="/collections">
                    <li>Collections</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav