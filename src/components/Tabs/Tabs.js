import React, {useState} from 'react';
import styled from 'styled-components';

import Dashboard from '../Dashboard/Dashboard';

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
    background-color: ${props => props.bcolor}
`

const Tabs = (props) => {
    const {children, tabs, addTab, value, setValue} = props;
    const alltabs = tabs.map((d, i) => {
    return <TabContainer onClick={() => setValue(i)} bcolor={i === value ? 'yellow': 'purple'}>Just a tab {i}</TabContainer>
    })

    return (
        <TabsContainer>
            {alltabs}
            <TabContainer onClick={addTab} bcolor={'green'}>+</TabContainer>
        </TabsContainer>
    )

}

const AddTabs = (props) => {
    const [value, setValue] = useState(0);
    const [currentNumTabs, setCurrentNumTabs] = useState(1);
    const addTab = () => {
        setCurrentNumTabs(currentNumTabs + 1)
        setValue(currentNumTabs)
    }
    const tabs = [...Array(currentNumTabs)];
    const tabpanels = [...Array(currentNumTabs)].map((t, i) => {
        return ( 
            <TabPanel key={i} value={value} index={i}>
                Hello {i}
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