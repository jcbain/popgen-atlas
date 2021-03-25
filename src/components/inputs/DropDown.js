import React, { useState } from 'react';
import styled from 'styled-components';
// import { DownArrow, UpArrow } from '@styled-icons/boxicons-regular';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    margin: 10px auto;
    font-family: 'Lato', sans-serif;

`
const Header = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 95% 5%;
    align-items: center;
    height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    height: 40px;
`

const Title = styled.div`
    position: absolute;
    top: -9px;
    left: 10px;
    background: white;
    font-size: 12px;
    padding-right: 1px;
`

const Selection = styled.p`
    width: 100%;
    margin-block-start: 0px;
    margin-block-end: 0px;
    line-height: 40px;

`

const Arrow = styled.div`
    width: 100%;
    cursor: pointer;
`

// const StyledUpArrow = styled(UpArrow)`
//     font-size: 0.5em;
//     color: ${({ theme }) => theme.dropDownArrowColor};
// `

const List = styled.div`
    position: absolute;
    width: 100%;
    z-index: 100;
    background: ${({ theme }) => theme.dropDownItemsColors};
    border: 2px solid ${({ theme }) => theme.dropDownItemsBorder};
    border-radius: 2px;
`

const ListItem = styled.div`
    height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: 0px solid white;
    border-top: 0px solid white;
    &:hover {
        background: linear-gradient(to left, ${({ theme }) => theme.dropDownHighLightGradient1}, ${({ theme }) => theme.dropDownHighLightGradient2});
        color:  white;
    }
`

const Option = styled.p`
    margin-block-start: 0px;
    margin-block-end: 0px;
    line-height: 40px;

`

const DropDown = ({ options, selection, makeSelection }) => {
    const [ open, setOpen ] = useState(false);

    const chooseSelection = (id) => {
        makeSelection(id)
        setOpen(false)
    }

    const optionItems = options.map( (o, i) => {
        return (
            <ListItem key={o.id} onClick={() => chooseSelection(o.id)}>
                <Option>{o.option}</Option>
            </ListItem>
        )
    } )


    return (
        <Wrapper>
            <Header>
                <Title>param</Title>
                <Selection>{selection}</Selection>
                {/* <Arrow onClick={() => setOpen(prev => !prev)}>{open ? <StyledUpArrow /> : <DownArrow /> }</Arrow> */}
                <Arrow onClick={() => setOpen(prev => !prev)}>{open ? '+': '-' }</Arrow>

            </Header>
            {open && <List>
                    {optionItems}
                </List>
            }

        </Wrapper>
    )
}

export default DropDown;