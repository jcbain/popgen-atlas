import React, {useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Dashboard from '../Dashboard/Dashboard';
import { render } from '@testing-library/react';

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
}

const passTabPanelProps = (index) => {
    return {
        id: `tab-panel-${index}`,
    }
}

const TabsContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const TabContainer = styled.div`
    background-color: ${props => props.activetab ? props.theme.color.background : props.theme.color.main};
    padding-left: 1vw;
    padding-right: 1vw;
    height: 7vh;
    line-height: 7vh;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border: 1px solid ${props => props.theme.color.background}; 
`

const Tabs = (props) => {
    const {children, tabs, addTab, value, setValue} = props;
    const alltabs = tabs.map((d, i) => {
        return <TabContainer key={i} onClick={() => setValue(i)} activetab={i === value}>Just a tab {i}</TabContainer>
    })

    return (
        <TabsContainer>
            {alltabs}
            <TabContainer onClick={addTab} activetab={false}>+</TabContainer>
        </TabsContainer>
    )

}

Tabs.propTypes = {
    activetab: PropTypes.bool
}

const migration = [
    {label: '1e-4', value: '1e-4'},
    {label: '1e-5', value: '1e-5'},

]

const mutation = [
    {label: '1e-6', value: '1e-6'},
]
const recombination = [
    {label: '1e-6', value: '1e-6'},
]
const selection = [
    {label: 2, value: '2'},
    {label: 5, value: '5'},
    {label: 25, value: '25'}
]

const population = [
    {label: 0, value: 0},
    {label: 1, value: 1}
]
const paramOptions = [
    {paramName: 'm', paramNameReadable: 'migration' ,options: migration},
    {paramName: 'mu', paramNameReadable: 'mutation', options: mutation},
    {paramName: 'r', paramNameReadable: 'recombination', options: recombination},
    {paramName: 'sigsqr', paramNameReadable: 'selection', options: selection},
    {paramName: 'pop', paramNameReadable: 'population', options: population}

]
let initParams = {}
paramOptions.map(d => {
    return initParams[d.paramName] = d.options[0].value;
})

const AddTabs = (props) => {
    const {lineChartData, geneArchData, template, identifier, viewwidth} = props;
    const [value, setValue] = useState(0);
    const [staticOpt, setStaticOpt] = useState(true);
    const [currentNumTabs, setCurrentNumTabs] = useState(1);
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
            componentSecondary : initComponentState('linechartgroup'),
            componentTertiary: initComponentState('genearchgroup'),
            componentFourth: initComponentState('genearchgroup'),
            componentGlobal: initComponentState('linechartgroup')
        }

    })
    const addTab = () => {
        setCurrentNumTabs(currentNumTabs + 1)
        setValue(currentNumTabs)
        setDashboardState(prevState => ({
            ...prevState, [currentNumTabs]: dashboardState[value]

        }))
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
                    viewwidth={viewwidth}
                    handleSwitch={handleSwitch}
                    xAction={xAction}
                    renderAction={renderAction}
                    cardAction={cardAction}
                    dashboardState={dashboardState[i]}
                    lineChartData={lineChartData}
                    geneArchData={geneArchData}
                    template={template}
                    identifier={identifier}
                    setStaticOpt={setStaticOpt}
                    >

                </Dashboard>
                
            </TabPanel>
        )
    })

    return (
        <div>
            <Tabs value={value} addTab={addTab} tabs={tabs} setValue={setValue}></Tabs>
            {tabpanels}

        </div>
    )


}

export default AddTabs;