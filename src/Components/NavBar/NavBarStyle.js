import styled from 'styled-components'

export const NavBar = styled.nav`
    display: flex;
    font-family: Georgia, serif;
    justify-content: space-around;
    align-items: center;
    min-height: 10vh;
    background-color: rgb(28, 46, 66);
`
export const NavTitle = styled.h3`
    color: rgb(255, 255, 255);
    font-size: 40px;
    font-weight: 300;
`
export const LinkWrapper = styled.ul`
    font-size: 20px;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
`

export const NavLinks = styled.li`
    display: inline-block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;

    &:hover {
        border-radius: 5px;
        background: rgb(129,147,166);
        background: linear-gradient(0deg, rgba(129,147,166,0.4430147058823529) 0%, rgba(58,85,99,0.47102591036414565) 44%, rgb(28, 46, 66) 100%);
    }
`