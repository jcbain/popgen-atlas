import styled from 'styled-components';

export const ParamContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: .25fr 1fr;
    align-items: start;
    margin-bottom: 2vh;
    border: 1px solid ${props => props.theme.color.graySecondary};
    padding-left: 0.5vw;
    padding-right: 0.5vw;
    padding-bottom: 1vh;
    border-radius: 3px;
`;

ParamContainer.defaultProps = {
    theme: {
        color: {
            graySecondary: '#efefef',
        }
    }
}

export const ParamDescription = styled.h2`
    font-family: 'Assistant', sans-serif;
    font-size: .9rem;
`

export const ParamLister = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.numparams}, 1fr);
    column-gap: 1vw;
    width: ${props => props.viewwidth - props.numparams}vw;
`;