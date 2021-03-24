import React from 'react'
import {Link} from 'react-router-dom'
import {NavBar, NavTitle,LinkWrapper, NavLinks} from './NavBarStyle'


function Nav() {
    return (
        <NavBar> 
            <NavTitle>Atlas of Population Genetics</NavTitle>
            <LinkWrapper>
                <Link to="/">
                    <NavLinks>Home</NavLinks>
                </Link>
                <Link to="/about">
                    <NavLinks>About</NavLinks>
                </Link>
                <Link to="/resources">
                    <NavLinks>Resources</NavLinks>
                </Link>
                <Link to="/collections">
                    <NavLinks>Collections</NavLinks>
                </Link>
            </LinkWrapper>
        </NavBar>
    )
}

export default Nav