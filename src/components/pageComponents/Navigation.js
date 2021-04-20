import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledNav = styled.nav`
    display: grid;
    grid-template-columns: 1fr 0.25fr;
    align-items: baseline;
`

const Name = styled.h2`
    color: ${({ theme }) => theme.navNameColor};
`

const LinkContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const StyledLink = styled(Link)`
    color: ${({ theme }) => theme.linkColor};
    font-family: ${({ theme }) => theme.simpleFont};
`

const Navigation = ({ name, links, ...rest }) => {

    const navLinks = links.map((l, i) => {
        return (
            <StyledLink className={'no-decoration'} key={i} to={l.path}>{l.name}</StyledLink>
        )
    })

    return (
        <StyledNav {...rest}>
            <Name>{name}</Name>
            <LinkContainer>
                {navLinks}
            </LinkContainer>
        </StyledNav>
    )

}

export default Navigation;