import styled from 'styled-components';
import Switch from "react-switch";

import DropDown from '../inputs/DropDown';
import useFriendlyLabels from '../../hooks/useFriendlyLabels';

const StaticContainer = styled.div`
    width: 80%;
    margin: auto;
    padding: 0 20px;
    background-color: ${({ theme }) => theme.paramCardBackground};
    border: 4px solid ${({ theme }) => theme.paramCardOutline};
    border-radius: 5px;
    text-align: center;
`

const BarWrapper = styled.div`
    width: 100%;
    height: 95%;
    background: ${({ theme }) => theme.paramBarBackground};
    padding: 1vw;
    font-family: ${({ theme }) => theme.funFont};
`

const ParamSection = styled.div`
    width: 90%;
    padding-top: 10px;
`

const StyledDropDown = styled(DropDown)`
    margin-bottom: 1.5vw;
    ${({ isInline }) => isInline && `
        display: inline-block;
        width: 25%;
        margin: auto;
    `}
`

const Header = styled.h2`
    color: ${({ theme }) => theme.paramHeaderColor};
    font-size: 1.7em;
    margin-bottom: 1em;
    display: inline-block;
`

const Description = styled.p`
    color: ${({ theme }) => theme.paramDescriptionColor};
    font-size: 1.1em;
`

const VariableParamBar = ({ theme, paramOptions, changeParam, isStatic, setStatic, isGlobal, isInline, focus, ...rest }) => {
    const { friendlyLabels } = useFriendlyLabels()

    const paramSelectors = Object.keys(paramOptions).map((p, i) => {
        const { paramName, values, selectedValue, isVariable } = paramOptions[p]

        return isVariable && <StyledDropDown isInline={isInline} key={i} param={friendlyLabels[paramName]} options={values} selection={selectedValue} makeSelection={(v) => changeParam(paramName, v, focus)} />
    })

    return (
        <BarWrapper {...rest}>
            { isGlobal && 
                <StaticContainer>
                    <Header style={{ marginRight: 20 }}>Static</Header>
                    <Switch
                        onChange={() => setStatic(!isStatic)}
                        checked={isStatic}
                        onColor={theme.thumbSliderOutline}/>
                </StaticContainer>
            }

            <ParamSection>
                { isGlobal && <Header>variable parameters</Header> }
                {paramSelectors}
                { isGlobal &&
                    <Description>
                        Results for a two-patch model of migration-selection balance. Migration rate indicates the proportion of individuals in each population that migrated from the other patch. Selection indicates the width of the fitness function (smaller values = stronger selection). Mutation indicates the rate per locus, per generation. Recombination indicates the rate between adjacent loci on a chromosome, per generation.
                    </Description>
                }
            </ParamSection>
        </BarWrapper>
    )
}

export default VariableParamBar;