import styled from 'styled-components';

export const ChartDiv = styled.div`
    width: 100%;
    height: 95%;
    display: grid;
    align-items: center;
    padding-top: 1%;
    padding-bottom: 1%;
    grid-template-areas: 
        "${({ chartname }) => chartname}-params"
        "${({ chartname }) => chartname}-legend"
        "${({ chartname }) => chartname}-focus"
        "${({ chartname }) => chartname}-context";
    grid-template-rows: 0.25fr 0.25fr 1fr 0.25fr;
`

export const ChartSVG = styled.svg`
    grid-area: ${({ chartname }) => chartname}-${({ gridarea }) => gridarea};

`