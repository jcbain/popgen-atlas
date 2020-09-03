import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Dashboard from '../Dashboard/Dashboard';
import { ParamSelector } from '../ParamSelector/ParamSelector';
import SwitchContainer from '../Buttons/Switch/SwitchContainer';
import { min, max } from 'lodash';

const TabPanel = (props) => {
    const { children, value, index } = props;

    return (
        <div hidden={value !== index}
            id={`tab-panel-${index}`}
        >
            {value === index && (
                <div>
                {children}
                </div>
            )}
        </div>
    )
};

const GlobalParamPanelDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const StyledH2 = styled.h2`
    font-family: 'Baloo Tamma 2', cursive;
    color: ${({ theme }) => theme.buttoncolor};
    font-size: 1em;
`;

const GlobalParamPanel = (props) => {
    const { children, value, index } = props;

    return (
        <div hidden={value !== index}
            id={`tab-panel-${index}`}
        >
            {value === index && (
                <GlobalParamPanelDiv>
                    <StyledH2>Global Parameters</StyledH2>
                    {children}
                </GlobalParamPanelDiv>
            )}
        </div>
    )
};


const DashboardTopBar = styled.div`
    grid-area: tabbar;
    display: grid;
    background-color: ${({theme}) => theme.color.backgroundLight};
    grid-template-areas:
        "tabs tabs tablineright tabmenu";
    grid-template-columns: 1fr 1fr 0.1fr 0.5fr;
    grid-template-rows: 1fr;
    border-radius: 5px;
    align-items: center;
    padding-left: 1vw;
    padding-right: 1vw;
`;

const TabsContainer = styled.div`
    grid-area: tabs;
    display: flex;
    flex-direction: row;
`
const TabContainerLine = styled.div`
    grid-area: tabline${({ linepos }) => linepos};
    width: 1px;
    height: 6vh;
    margin: auto auto;
    background-color: ${({ theme }) => theme.color.grayLight};
`
const TabContainer = styled.div`
    background-color: ${({ theme }) => theme.color.backgroundLight};
    padding-left: 1vw;
    padding-right: 1vw;
    height: 7vh;
    font-family: 'Baloo Tamma 2', cursive;
    font-weight: ${props => props.activetab ? '600' : '400'};
    color: ${({ theme }) => theme.color.grayMain};
    line-height: 7vh;
    cursor: pointer;
    min-width: 12vw;
    text-align: center;
    border-bottom: 2px solid ${({ theme, activetab })=> activetab ? theme.buttoncolor : theme.color.backgroundLight};
    &:hover {
        background-color:  ${({ theme, activetab }) => activetab ? theme.color.backgroundLight : theme.buttoncoloralpha};
        font-weight: ${props => props.activetab ? '600' : '500'};
        border-bottom: 2px solid ${({ theme, activetab }) => activetab ? theme.buttoncolor : theme.color.backgroundLight};
    }
`

const TabAddButton = styled.button`
    background-color: ${({ theme }) => theme.buttoncolor};
    height: 25px;
    width: 25px;
    border-radius: 5px;
    margin: auto 1vw;
    cursor: pointer;
    border: 1px solid ${({ theme })=> theme.buttoncolor};
    color: ${({ theme })=> theme.color.main};
`

const TabComponentContainer = styled.div`
    display: grid;
    grid-template-areas: 
        "tabbar tabbar sidepanel"
        "dashboard dashboard sidepanel"
        "dashboard dashboard sidepanel";
    grid-template-columns: ${({ dashboardviewwidth }) => dashboardviewwidth/2}vw ${({ dashboardviewwidth }) => dashboardviewwidth/2}vw ${({ dashboardviewwidth }) => 100 - dashboardviewwidth}vw;
    grid-template-rows: 10vh ${({ dashboardviewheight }) => dashboardviewheight/2}vh ${({ dashboardviewheight }) => dashboardviewheight/2}vh;
    width: 100vw;
`

const ParamText = styled.p`
    font-family: 'Baloo Tamma 2', cursive;
    color: ${({ theme }) => theme.color.grayMain};
    font-size: 0.8em;
`

const Tabs = (props) => {
    const { tabs, addTab, value, setValue } = props;
 
    const alltabs = tabs.map((d, i) => {
        return <TabContainer key={i} onClick={() => setValue(i)} activetab={i === value}>D{i+1}</TabContainer>
    })

    return (
        <TabsContainer>
            {alltabs}
            <TabAddButton onClick={addTab}>+</TabAddButton>
        </TabsContainer>
    )

}

Tabs.propTypes = {
    activetab: PropTypes.bool
}


const DashboardWrapper = styled.div`
    grid-area: dashboard;
`

const SideBar = styled.div`
    grid-area: sidepanel;
    padding-left: 2vw;
    padding-right: 2vw;
    padding-top: 2vh;

`

const ButtonDiv = styled.div`
    border: 4px solid ${({theme}) => theme.buttoncolor};
    border-radius: 5px;
    width: 100%;
    display: grid;
    grid-template-columns: .5fr 1fr;
    align-items: center;
    font-family: 'Baloo Tamma 2', cursive;
    font-weight: 600;
    color: ${({ theme }) => theme.color.grayMain};
`


const AddTabs = (props) => {
    const { lineChartData, geneArchData, template, identifier, 
            themes, maxTabs, paramOptions, readableLabels, 
            paramPermutationData } = props;

    const minEffectVal = min(geneArchData.map(d => d['effect_size_freq_diff'])),
          maxEffectVal = max(geneArchData.map(d => d['effect_size_freq_diff']));

    let initParams = {}
    paramOptions.map(d => {
        return initParams[d.paramName] = d.options[0].value;
    })
    
    const [value, setValue] = useState(0);
    const [staticOpt, setStaticOpt] = useState(true);
    const [currentNumTabs, setCurrentNumTabs] = useState(1);
    const dashboardviewwidth = 80;
    const dashboardviewheight = 150;
    const initComponentState = (selectedChart) => {
        return {
            selectedChart,
            params: {...initParams},
            view: 'chartview'
        }
    }


    const [dashboardState, setDashboardState] = useState({
        0: {
            componentMain: initComponentState('linechartgroup'),
            componentSecondary : initComponentState('genearchgroup'),
            componentTertiary: initComponentState('histogram'),
            componentFourth: initComponentState('histogram'),
            componentGlobal: initComponentState('linechartgroup')
        },
    })

    const addTab = () => {
        if ( currentNumTabs < maxTabs ) {
            setCurrentNumTabs(currentNumTabs + 1)
            setValue(currentNumTabs)
            setDashboardState(prevState => ({
                ...prevState, [currentNumTabs]: dashboardState[value]
    
            }))
        }

    }



    const handleSwitch = componentKey => (k, v) => {
        setDashboardState(prevState => ({
            ...prevState, [value] : {
                ...prevState[value], [componentKey] : {
                    ...prevState[value][componentKey], params: {
                        ...prevState[value][componentKey].params, [k]: v
                    }
                }
            }
        }))
    }

    const handleSlider = componentKey => (v) => {
        setDashboardState(prevState => ({
            ...prevState, [value] : {
                ...prevState[value], [componentKey] : {
                    ...prevState[value][componentKey], params: {
                        ...prevState[value][componentKey].params, 'output_gen': v
                    }
                }
            }
        }))
    }

    const xAction  = componentKey => () => {
        setDashboardState(prevState => ({
            ...prevState, [value]: {
                ...prevState[value], [componentKey] : {
                    ...prevState[value][componentKey], view: 'cardview'
                }
            }
        }))
    }

    const renderAction = componentKey => () => {
        setDashboardState(prevState => ({
            ...prevState, [value]: {
                ...prevState[value], [componentKey] : {
                    ...prevState[value][componentKey], view: 'chartview'
                }
            }
        }))
    }

    const cardAction = componentKey => id => {
        setDashboardState(prevState => ({
            ...prevState, [value]: {
                ...prevState[value], [componentKey]: {
                    ...prevState[value][componentKey], view: 'paramview', selectedChart: id
                }
            }
        }))
    }
    const tabs = [...Array(currentNumTabs)];
    const tabpanels = [...Array(currentNumTabs)].map((t, i) => {
        return ( 
            <TabPanel key={i} value={value} index={i}>
                <Dashboard paramOptions={paramOptions}
                    isStatic={staticOpt}
                    viewwidth={dashboardviewwidth}
                    viewheight={dashboardviewheight}
                    handleSwitch={handleSwitch}
                    handleSlider={handleSlider}
                    xAction={xAction}
                    renderAction={renderAction}
                    cardAction={cardAction}
                    dashboardState={dashboardState[i]}
                    lineChartData={lineChartData}
                    geneArchData={geneArchData}
                    template={template}
                    identifier={identifier}
                    setStaticOpt={setStaticOpt}
                    readableLabels={readableLabels}
                    themes={themes}
                    paramPermutationData={paramPermutationData}
                    colorMax={maxEffectVal}
                    colorMin={minEffectVal}
                    >
                </Dashboard> 
            </TabPanel>
        )
    })
    const parampanels = [...Array(currentNumTabs)].map((t, i) => {
        return (
            <GlobalParamPanel key={i} value={value} index={i}>
                {paramOptions.filter(p => p.paramName !== 'pop' && p.paramName !== 'output_gen').map((d, j) => {
                    return (
                        <ParamSelector key={j} 
                                className='param-selector'
                                paramName={d.paramName}
                                paramNameReadable={d.paramNameReadable}
                                options={d.options}
                                selectedValue={dashboardState[i].componentGlobal['params'][d.paramName]}
                                handleSwitch={handleSwitch('componentGlobal')}
                            />
                    )
                })}

            </GlobalParamPanel>

        )

    })


    return (
        <TabComponentContainer dashboardviewwidth={dashboardviewwidth}
            dashboardviewheight={dashboardviewheight}>
            <DashboardTopBar>
                <Tabs value={value} addTab={addTab} tabs={tabs} setValue={setValue}></Tabs>
                <TabContainerLine linepos={'right'} />
            </DashboardTopBar>
            <DashboardWrapper>{tabpanels}</DashboardWrapper>
            <SideBar>
                <SwitchContainer label={'static'} width={'100%'} isOn={staticOpt} handleToggle={() => setStaticOpt(!staticOpt)}/>
                {parampanels}
                <ParamText>Results for a two-patch model of migration-selection balance. Migration rate indicates the proportion of individuals in each population that migrated from the other patch. Selection indicates the width of the fitness function (smaller values = stronger selection). Mutation indicates the rate per locus, per generation. Recombination indicates the rate between adjacent loci on a chromosome, per generation.</ParamText>
            </SideBar>

        </TabComponentContainer>
    )


}

export default AddTabs;