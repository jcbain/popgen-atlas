import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { MenuAltLeft } from '@styled-icons/boxicons-regular'

const Wrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 50px;
    position: relative;
`

const Header = styled.div`
    display: grid;
    grid-template-columns: 50px 1fr; 
    align-items: center;

`

const Spacer = styled.div`
    height: 100%;
    width: 100%;
    /* background: black; */
    display: grid;
    justify-content: center;
    align-items: center;
`

const StyledMenu = styled(MenuAltLeft)`
    color: black;
    width: 30px;
    
`

const Title = styled.p`
    font-size: 24px;
    margin-block-end: 0;
    margin-block-start: 0;
`

const NavWrapper = styled.div`
    position: relative;
    align-self: center;
    &.sidebar-container{
        z-index: 100;
        width: 400px;
        height: calc(100vh - 50px);
        /* border: 1px solid ${({ theme }) => theme.navSideOutline}; */
        /* border-top: 1px solid gray; */
        padding: 20px 0px;
        position: absolute;
        border-radius: 2px;
        left: 0px;
        top: 50px;
        transform: translate(-100%, 0);
        transition: transform 0.5s;
        background: ${({ theme }) => theme.navSideColor};
        /* filter: drop-shadow(1px 2px 1px #dbdbdb); */
        &.sidebar-open{
            transform: translate(0%, 0);
        }
    }

`

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &.sidebar-nav{
        flex-direction: column;
    }
`

const StyledLink = styled(Link)`
    font-size: 18px;
    color: ${({ theme }) => theme.linkColor};
    font-family: ${({ theme }) => theme.simpleFont};
    &.sidebar-link {
        padding-left: 30px;
        padding-bottom: 15px;
    }
`

const NewNav = ({ name, links, isSide }) => {
    const [ open, setOpen ] = useState(false)

    const navLinks = links.map((l, i) => {
        return (
            <StyledLink key={i}
                className={classNames({'no-decoration': true, 'sidebar-link': isSide })} 
                to={l.path}
                onClick={() => setOpen(false)}>
                    {l.name}
            </StyledLink>
        )
    })

    return (
        <Wrapper>
            <Header>
                <Spacer onClick={() => setOpen(prev => !prev)}>
                    <StyledMenu />
                </Spacer>
                <Title>
                    {name}
                </Title>
            </Header>
            <NavWrapper className={classNames({'sidebar-container': isSide, 'sidebar-open': open })}>
                <Nav className={classNames({'sidebar-nav' : isSide })}>
                    {navLinks}
                </Nav>
            </NavWrapper>
        </Wrapper>
    )
}

export default NewNav;