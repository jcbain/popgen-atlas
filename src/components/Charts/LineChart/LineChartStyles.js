import styled from 'styled-components';

export const FocusedStop = styled.stop`
    stop-color: ${props => props.theme.popColorFocus};
`

FocusedStop.defaultProps = {
    theme: {
        popColorFocus: '#eb348f',
    }
}


export const OutsideStop = styled.stop`
    stop-color: ${props => props.theme.popColorOutside};
    stop-opacity: ${props => props.stopopacity};
`

OutsideStop.defaultProps = {
    theme: {
        popColorOutside: '#d6d6d6',
    },
    stopopacity: 1,
}