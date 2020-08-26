import styled from 'styled-components';

export const ParamContainer = styled.div`
    display: ${props => props.display || 'grid'};
    grid-template-columns: 1fr;
    grid-template-rows: .25fr 1fr;
    align-items: start;
    margin-bottom: 2vh;
    background-color: ${({ theme }) => theme.color.main};
    border: 1px solid ${({ theme }) => theme.color.graySecondary};
    padding-left: 0.5vw;
    padding-right: 0.5vw;
    padding-bottom: 1vh;
    border-radius: 3px;
    width: ${props => props.viewwidth}vw;
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
    background-color: ${({ theme }) => theme.color.main};
    grid-template-columns: repeat(${props => props.numparams}, 1fr);
    column-gap: 1vw;
    width: 100%;
`;