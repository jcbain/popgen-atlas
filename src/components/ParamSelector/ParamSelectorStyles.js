import styled from 'styled-components';
import PropTypes from 'prop-types';

export const SelectWrapper = styled.div`
    width: ${props => props.viewwidth - props.paddings.left - props.paddings.right}vw;
    padding-left: ${props => props.paddings.left}vw;
    padding-right: ${props => props.paddings.right}vw;
    position: relative;
    font-family: 'Ubuntu', sans-serif;
`;

SelectWrapper.defaultProps = {
    paddings: {
        left : 0,
        right: 0
    }
}

export const SelectWrapperSlider = styled.div`
    grid-area: ${({ chartname }) => chartname}-${({ gridarea }) => gridarea};
    width: ${props => props.viewwidth - props.paddings.left - props.paddings.right}vw;
    height: 100%;
    padding-left: ${props => props.paddings.left}vw;
    padding-right: ${props => props.paddings.right}vw;
    position: relative;
    font-family: 'Ubuntu', sans-serif;
`;

SelectWrapperSlider.defaultProps = {
    paddings: {
        left : 0,
        right: 0
    }
}

export const ParamTitle = styled.span`
    top: -${props => props.viewheight/2}vh;
    left: 1vw;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-bottom: 0;
    font-size: .5em;
    background-color: ${props => props.theme.color.main};
    position: absolute;
    height: ${props => props.viewheight}vh;
    line-height: ${props => props.viewheight}vh;
    z-index: 150;
    padding-left: 4px;
    padding-right: 4px;
    overflow: hidden;
    font-size: ${props => (props.viewwidth - 4)/props.viewwidth}em;
    color: ${props => props.theme.color.grayMain};
`;

ParamTitle.defaultProps = {
    viewheight: 5,
    viewwidth: 10,
    theme: {
        color: {
            main: '#fff',
            grayMain: '#6e6e6e'
        }
    }   

}

export const ParamTitleSlider = styled.p`
    height: ${props => props.viewheight}vh;
    line-height: ${props => props.viewheight}vh;
    font-size: 0.5em;
    color: ${props => props.theme.color.grayMain};

`

export const SelectHeaderWrapper = styled.div`
    height: ${props => props.viewheight}vh;
    // border: 2px solid ${props => props.addhover ? props.theme.color.main : props.theme.color.secondary};
    line-height: ${props => props.viewheight}vh;
    font-size: 1em;
    border-radius: 2px;
    z-index: 100;
    width: 100%;
    font-family: 'Baloo Tamma 2', cursive;
    transition-duration: 1s;
    &:hover {
        // border: 2px solid ${props => props.addhover ? props.theme.color.secondary : props.theme.color.secondary};
        svg > path {
            color: ${props => props.addhover ? 'black' : 'black'};
        }
    }
`

SelectHeaderWrapper.propTypes = {
    onhover: PropTypes.bool,
}

SelectHeaderWrapper.defaultProps ={
    viewheight: 10,
    theme: {
        color: {
            main: '#fff',
            secondary: "palevioletred"
        }
    }
}

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
    border: 1px solid ${props => props.theme.color.graySecondary};
    z-index: 1000;
`

OptionWrapper.defaultProps = {
    displayopt: 'flex',
    offsetheight: 10,
    theme: {
        color: {
            graySecondary: '#efefef',
        }
    }
}

export const OptionButton = styled.button`
    background-color: white;
    border: none;
    font-family: 'Ubuntu', sans-serif;
    line-height: ${props => props.viewheight}vh;
    height: ${props => props.viewheight}vh;
    text-align: left;
    border: none;
    &:hover{
        background-color: ${props => props.theme.color.graySecondary};
    }
`;

OptionButton.defaultProps ={
    viewheight: 10,
    theme: {
        color: {
            graySecondary: '#efefef',
        }
    }
}