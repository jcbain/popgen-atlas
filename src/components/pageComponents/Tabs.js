import { useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames'

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
    const [index, setIndex] = useState(0)
    const [ defaultChosenSet, setDefaultChosenSet ] = useState("")

    const addTab = () => {
        setTabs(prev => [...prev, 'james'])
    }

    const dashboards = tabs.map((t, i) => {
        return (
            <Dashboard theme={theme} data={data} loaded={loaded} defaultSet={defaultChosenSet} setDefaultSet={setDefaultChosenSet} className={classNames({'hidden': index !== i})}/>
        )
    })

    const tabButtons = tabs.map((t, i) => {
        return (
            <button key={i} onClick={() => setIndex(i)}>new tab</button>
        )
    })

    return (
        <Wrapper>
            {loaded && <>
                <TabContainer>
                    {tabButtons}
                    <button onClick={addTab}>ADD</button>
                </TabContainer>
                {/* <Dashboard theme={theme} data={data} loaded={loaded}/> */}
                <div>
                {dashboards}
                </div>
            </>}
        </Wrapper>
    )
}

export default Tabs;