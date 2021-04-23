import { useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import useOutsideAlerter from '../../hooks/useOutsideAlerter';

const MobileButton = styled.div`
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: black;
`

const StyledNav = styled.nav`
    position: relative; 
`

const LinksWrapper = styled.div`
    max-width: 200px;
    position: absolute;
    top: 40px;
    left: 40px;
    border: 2px solid black;
    border-radius: 5px;
    &.full-view-wrapper {
        position: static;
        max-width: 100%;
        border: none;
        border-radius: 0px;
    }

`
const LinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &.full-view-menu {
        flex-direction: row;
    }
`

const StyledLink = styled(Link)`
    color: ${({ theme }) => theme.linkColor};
    font-family: ${({ theme }) => theme.simpleFont};
    padding-bottom: 5px;
    padding-top: 5px;
    padding: 10px 20px;
    &.partial-view-link:hover {
        background: linear-gradient(to left, ${({ theme }) => theme.dropDownHighLightGradient1}, ${({ theme }) => theme.dropDownHighLightGradient2});
        color:  white;
    }
`

const Navigation = ({ links, isFullView, ...rest }) => {

    const [ open, setOpen ] = useState(isFullView && true);
    const linksRef = useRef();
    useOutsideAlerter(linksRef, () => setOpen(false))


    const navLinks = links.map((l, i) => {
        return (
            <StyledLink className={classNames({'no-decoration': true, 'partial-view-link': !isFullView })} key={i} to={l.path}>{l.name}</StyledLink>
        )
    })

    return (
        <StyledNav {...rest}>
            <MobileButton className={classNames({'hidden': isFullView})} onClick={() => setOpen(prev => !prev)}/>
            <LinksWrapper ref={linksRef} className={classNames({'full-view-wrapper': isFullView, 'hidden': !open})}> 
                <LinkContainer className={classNames({'full-view-menu': isFullView })}>
                    {navLinks}
                </LinkContainer>
            </LinksWrapper>
        </StyledNav>
    )

}

export default Navigation;