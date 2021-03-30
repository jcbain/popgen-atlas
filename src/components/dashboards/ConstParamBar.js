import React from 'react';
import styled from 'styled-components';

import ParamCard from '../widgets/ParamCard';
import useFriendlyLabels from '../../hooks/useFriendlyLabels'

const BarWrapper = styled.div`
    
`

const ParamSection = styled.div`
    display: flex;
    justify-content: space-between;

`

const StyledParamCard = styled(ParamCard)`
    /* margin-right: 10px; */
    width: 100px;
`

const ConstParamBar = ({paramOptions, ...rest}) => {
    const { friendlyLabels } = useFriendlyLabels();

    const constParams = Object.keys(paramOptions).map((p, i) => {
        const { paramName, values,  selectedValue } = paramOptions[p];

        return <StyledParamCard key={i} label={friendlyLabels[paramName]} value={selectedValue} />

    })


    return (
        <BarWrapper {...rest}>
            <ParamSection>
            {constParams}
            </ParamSection>
        </BarWrapper>
    )
}

export default ConstParamBar;