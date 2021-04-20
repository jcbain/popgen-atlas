import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const MobileButton = styled.div`
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: pink;
`

const StyledNav = styled.nav`
    position: relative; 

`

const LinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 200px;
    position: absolute;
    top: 40px;
    left: 40px;
    padding: 10px 20px;
    &.full-view {
        position: static;
        flex-direction: row;
        max-width: 100%;
    }
`

const StyledLink = styled(Link)`
    color: ${({ theme }) => theme.linkColor};
    font-family: ${({ theme }) => theme.simpleFont};
`

const Navigation = ({ links, isFullView, ...rest }) => {

    const [ open, setOpen ] = useState(isFullView && true);



    const navLinks = links.map((l, i) => {
        return (
            <StyledLink className={'no-decoration'} key={i} to={l.path}>{l.name}</StyledLink>
        )
    })

    return (
        <StyledNav {...rest}>
            <MobileButton className={classNames({'hidden': isFullView})} onClick={() => setOpen(prev => !prev)}/>
            <LinkContainer className={classNames({'full-view': isFullView, 'hidden': !open})}>
                {navLinks}
            </LinkContainer>
        </StyledNav>
    )

}

export default Navigation;