import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { device } from '../../devices';
import routes from '../../routes';

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

const StyledNavLink = styled(NavLink)`
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

const routeComponents = routes.map(({path, component, refresh}, key) => <Route key={key} exact path={path} refresh={refresh} component={component} />);

const linkData = [
    { name: 'home', path: '/' },
    { name: 'about', path: '/about' },
    { name: 'resources', path: '/resources' },
    { name: 'collections', path: '/collections' }
];


const Navigation = (props) => {
    const links = linkData.map((l, i) => {
        const { name, path } = l;
        return <p key={i}><StyledNavLink to={path}>{ name }</StyledNavLink></p>
      })


    return(
        <Header className="header">
            <HeaderTitle>Atlas of Population Genetics</HeaderTitle>
            <Nav>
                { links }
            </Nav>
            <Switch>
                { routeComponents }
            </Switch>
        </Header>
    )
}

export default Navigation;
