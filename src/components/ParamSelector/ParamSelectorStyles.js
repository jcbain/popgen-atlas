import styled from 'styled-components';

export const SelectWrapper = styled.div`
    width: 100%;
    padding-left: 3px;
    padding-right: 3px;
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
    width: 90%;
    height: 100%;
    padding-left: 5%;
    padding-right: 5%;
    position: relative;
    font-family: 'Ubuntu', sans-serif;
`;

export const ParamTitle = styled.span`
    top: -5px;
    left: 1vw;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-bottom: 0;
    font-size: .5em;
    position: absolute;
    line-height: 100%;
    z-index: 150;
    padding-left: 4px;
    padding-right: 4px;
    overflow: hidden;
    font-size: 0.75em;
    color: ${({ theme }) => theme.color.grayMain};
`;

ParamTitle.defaultProps = {
    theme: {
        color: {
            main: '#fff',
            grayMain: '#6e6e6e'
        }
    }   

}

export const ParamTitleSlider = styled.p`
    line-height: 100%;
    font-size: 0.5em;
    color: ${({ theme }) => theme.color.grayMain};

`

export const SelectHeaderWrapper = styled.div`
    line-height: 55px;
    font-size: 1em;
    z-index: 100;
    width: 100%;
    font-family: 'Baloo Tamma 2', cursive;
`


SelectHeaderWrapper.defaultProps ={
    theme: {
        color: {
            main: '#fff',
            secondary: "palevioletred"
        }
    }
}

export const SelectTitle = styled.div`
    margin-right: 10px;
    margin-left: 10px;
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
    top: 10px;
    border: 1px solid ${({ theme }) => theme.color.graySecondary};
    z-index: 1000;
`

OptionWrapper.defaultProps = {
    displayopt: 'flex',
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
    line-height: 100%;
    height: 40px;
    text-align: left;
    border: none;
    &:hover{
        background-color: ${({ theme }) => theme.color.graySecondary};
    }
`;

OptionButton.defaultProps ={
    theme: {
        color: {
            graySecondary: '#efefef',
        }
    }
}