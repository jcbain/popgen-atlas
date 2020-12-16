import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Home from '../../pages/Home';
import Collections from '../../pages/Collections';
import Resources from '../../pages/Resources';
import About from '../../pages/About';

import { device } from '../../devices';


const Header = styled.header`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: baseline;
    justify-content: center;
    text-align: center;
    @media ${ device.tablet }{
        text-align: initial;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr 1fr;
    }
`;

const HeaderTitle = styled.h1`
    color: ${({ theme }) => theme.textColor };
    font-family: ${({ theme }) => theme.fontFlashy};
    padding: 0 ${({ theme }) => theme.mainPaddingX};
    font-size: 26px;
    font-weight: 600;
    @media ${ device.tablet } {
        padding: 0 0 0 ${({ theme }) => theme.mainPaddingX};
    }
`

const Nav = styled.nav`
    font-family: ${({ theme }) => theme.fontMain};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 ${({ theme }) => theme.mainPaddingX};
    @media ${ device.tablet } {
        padding: 0 ${({ theme }) => theme.mainPaddingX} 0 0;
    }
`;

const StyledNavLink = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.textColor };
    &:active {
        text-decoration: none;
    }
    &:hover {
        text-decoration: none;
    }
    &:visited {
        text-decoration: none;
    }
`;


const linkData = [
    { name: 'home', path: '/', component: Home, exact: true },
    { name: 'about', path: '/about', component: About },
    { name: 'resources', path: '/resources', component: Resources },
    { name: 'collections', path: '/collections', component: Collections }
];
 


const Navigation = (props) => {
    let links = [];
    let routes = [];

    linkData.forEach((l, i) => {
        const { name, path, exact } = l;
        const link = (
            <p key={i}><StyledNavLink to={path}>{ name }</StyledNavLink></p>
        );
        const route = (
            <Route key={i} exact={exact} path={path}>
                <l.component />
            </Route>
        );
        links.push(link);
        routes.push(route);
    })

    return(
        <>
            <Header>
                <HeaderTitle>Atlas of Population Genetics</HeaderTitle>
                <Nav>
                    { links }
                </Nav>
            </Header>
            <Switch>
                {routes}
            </Switch>
        </>
        
    )
}

export default Navigation;
