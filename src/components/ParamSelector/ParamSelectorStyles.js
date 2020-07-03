import styled from 'styled-components';

export const SelectWrapper = styled.div`
    width: ${props => props.viewwidth}vw;
    position: relative;
    font-family: 'Ubuntu', sans-serif;
`;

export const ParamTitle = styled.span`
    top: -${props => props.viewheight/2}vh;
    left: 1vw;
    padding-bottom: 0;
    font-size: .5em;
    background-color: #fff;
    position: absolute;
    height: ${props => props.viewheight}vh;
    line-height: ${props => props.viewheight}vh;
    z-index: 150;
    padding-left: 4px;
    padding-right: 4px;
    font-size: ${props => props.viewheight*0.6}vh;
    color: #6e6e6e;
`;

export const SelectHeaderWrapper = styled.div`
    height: ${props => props.viewheight}vh;
    border: 2px solid palevioletred;
    line-height: ${props => props.viewheight}vh;
    font-size: 1.2em;
    border-radius: 2px;
    z-index: 100;
    width: 100%;
`
export const SelectTitle = styled.div`
    margin-right: 1vw;
    margin-left: 1vw;
    display: grid;
    grid-template-columns: 1fr .25fr;
    z-index: 200;
    align-items: center;
`;

export const OptionWrapper = styled.div`
    width: 100%;
    display: ${props => props.displayopt || 'none'};
    margin-top: 1vh;
    background-color: #fff;
    flex-direction: column;
    position: absolute;
    top: ${props => props.offsetheight}vh;
    border: 1px solid #efefef;
    z-index: 1000;
`

export const OptionButton = styled.button`
    background-color: white;
    border: none;
    font-family: 'Ubuntu', sans-serif;
    line-height: ${props => props.viewheight}vh;
    height: ${props => props.viewheight}vh;
    text-align: left;
    border: none;
    &:hover{
        background-color: #efefef;
    }
`;