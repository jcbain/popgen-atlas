import React from 'react';
import styled from 'styled-components';

import DropDown from '../inputs/DropDown';
import useFriendlyLabels from '../../hooks/useFriendlyLabels'

const BarWrapper = styled.div`
    width: 100%;
    background: ${({ theme }) => theme.paramBarBackground};
    padding: 10px;
    font-family: ${({ theme }) => theme.funFont};
`

const ParamSection = styled.div`
    width: 80%;
    margin-left: auto;
    margin-right: auto;
`

const StyledDropDown = styled(DropDown)`
    margin-bottom: 20px;
`

const Header = styled.h2`
    color: ${({ theme }) => theme.paramHeaderColor};
    font-size: 24px;
    margin-bottom: 20px;
`

const Description = styled.p`
    color: ${({ theme }) => theme.paramDescriptionColor};
    font-size: 12px;

`;

const ParamBar = ({paramOptions, changeParam}) => {
    const { friendlyLabels } = useFriendlyLabels();

    const paramSelectors = Object.keys(paramOptions).map((p, i) => {
        const { paramName, values, selectedValue } = paramOptions[p];

        return <StyledDropDown key={i} param={friendlyLabels[paramName]} options={values} selection={selectedValue} makeSelection={(v) => changeParam(paramName, v)} />

    })


    return (
        <BarWrapper>
            
            <ParamSection>
                <Header>parameters</Header>
                {paramSelectors}
                <Description>
                    Results for a two-patch model of migration-selection balance. Migration rate indicates the proportion of individuals in each population that migrated from the other patch. Selection indicates the width of the fitness function (smaller values = stronger selection). Mutation indicates the rate per locus, per generation. Recombination indicates the rate between adjacent loci on a chromosome, per generation.
                </Description>
            </ParamSection>
            

        </BarWrapper>
    )
}

export default ParamBar;