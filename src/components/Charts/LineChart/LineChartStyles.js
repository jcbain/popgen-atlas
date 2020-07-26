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

export const ReferenceText = styled.text`
    fill: ${props => props.theme.popColorFocus};
    font-family: ${props => props.referencefont};
`

ReferenceText.defaultProps = {
    theme: {
        popColorFocus: '#eb348f',
    },
    referencefont: 'Itim'
}

export const ReferenceRect =  styled.rect`
    fill: #ffffff;
    stroke: ${props => props.theme.popColorFocus};
    stroke-width: 2px;
`

ReferenceRect.defaultProps = {
    theme: {
        popColorFocus: '#eb348f',
    }
}