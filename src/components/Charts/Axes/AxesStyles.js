import styled from 'styled-components';

export const TickText = styled.text`
    font-family: ${props => props.theme.tickfont};
    fill: ${props => props.theme.tickfill};
`

TickText.defaultProps = {
    theme: {
        tickfont: 'Roboto Slab',
        tickfill: '#e3e3e3'
    }
}

export const TickLine = styled.line`
    stroke: ${props => props.theme.tickfill};
`;