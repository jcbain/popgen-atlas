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

`

const Spacer = styled.div`
    height: 100%;
    width: 100%;
    background: black;
`

const Title = styled.p`
    font-size: 24px;
    margin-block-end: 0;
    margin-block-start: 0;
`

const NavWrapper = styled.div`
    position: relative;
    &.sidebar-container{
        width: 200px;
        position: absolute;
        left: 0px;
        top: 74px;
        transform: translate(-100%, 0);
        transition: transform 0.5s;
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
`

const NewNav = ({ name, links, isSide }) => {
    const [ open, setOpen ] = useState(false)

    const navLinks = links.map((l, i) => {
        return (
            <StyledLink key={i}
                className={classNames({'no-decoration': true})} 
                to={l.path}>{l.name}</StyledLink>
        )
    })

    return (
        <Wrapper>
            <Header>
                <Spacer onClick={() => setOpen(prev => !prev)}>

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