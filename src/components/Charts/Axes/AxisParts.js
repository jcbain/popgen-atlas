import styled from 'styled-components';

export const TickText = styled.text`
    font-family: ${props => props.theme.tickfont};
    fill: ${props => props.theme.tickfill};
`

TickText.defaultProps = {
    theme: {
        tickfont: 'Roboto',
        tickfill: 'black'
    }
}

export const TickLine = styled.line`
    stroke: ${props => props.theme.tickfill};
`;