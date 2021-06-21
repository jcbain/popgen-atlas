import { useState } from 'react';
import styled from 'styled-components';
import Dashboard from '../dashboards/Dashboard';

import useData from '../../hooks/useData';



const Wrapper = styled.div`
    padding-top: 200px;


`

const TabContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const Tabs = ({theme}) => {

    const { data, loaded } = useData()

    const [tabs, setTabs] = useState(['james'])

    const addTab = () => {
        setTabs(prev => [...prev, 'james'])
    }

    const tabButtons = tabs.map((t, i) => {
        return (
            <button key={i} onClick={addTab}>new tab</button>
        )
    })

    return (
        <Wrapper>
            {loaded && <>
                <TabContainer>
                    {tabButtons}
                </TabContainer>
                <Dashboard theme={theme} data={data} loaded={loaded}/>
            </>}
        </Wrapper>
    )
}

export default Tabs;