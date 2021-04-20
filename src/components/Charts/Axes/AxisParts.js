import styled from 'styled-components';

export const TickText = styled.text`
    font-family: ${({ theme }) => theme.simpleFont};
    fill: ${({ theme }) => theme.axisTickFill };
`

TickText.defaultProps = {
    theme: {
        simpleFont: 'sans-serif',
        axisTickFill: 'black'
    }
}

export const TickLine = styled.line`
    fill: ${({ theme }) => theme.axisTickFill };
`;