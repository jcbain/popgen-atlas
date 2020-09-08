import React from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const LoadingDiv = styled.div`
    width: 100%;
    height: 100vh;
    padding-left: 45%;
`

const StyledIcon = styled(FontAwesomeIcon)`
    color: ${({ theme }) => theme.sliderbar};
`

const LoadingIcon = () => {

    return (
        <LoadingDiv>
            <StyledIcon icon={faSpinner} pulse size="6x" />
        </LoadingDiv>
    )
}

export default LoadingIcon;