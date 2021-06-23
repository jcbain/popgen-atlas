import { useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames'
import { Plus } from '@styled-icons/boxicons-regular'

import Dashboard from '../dashboards/Dashboard';

import useData from '../../hooks/useData';



const Wrapper = styled.div`
    padding-top: 200px;

`

const TabContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding-left: ${({ theme }) => theme.smallPaddingH};
    align-items: center;

`

const SelectButton = styled.button`
    border: none;
    background: ${({ theme }) => theme.paramBarBackground};
    padding: 10px;
    height: 50px;
    color: ${({ theme }) => theme.tabFontColor};
    /* border-radius: 5px; */
    &.selected {
        background: ${({ theme }) => theme.dashboardBackground};
        border-top: 2px solid ${({ theme }) => theme.paramCardOutline};
        color: ${({ theme }) => theme.paramCardOutline};
        font-weight: 800;
    }
`

const AddButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 5px;
    background: ${({ theme }) => theme.dashboardBackground};
    color: ${({ theme }) => theme.paramCardOutline};
    border: none;
    margin-left: 5px;

`

const StyledPlus = styled(Plus)`
    width: 20px;

`

const Tabs = ({theme}) => {

    const { data, loaded } = useData()

    const [tabs, setTabs] = useState([{}])
    const [index, setIndex] = useState(0)
    const [ defaultChosenSet, setDefaultChosenSet ] = useState("")

    const addTab = () => {
        setTabs(prev => {
            setIndex(prev.length)
            return [...prev, {}]
        })
    }

    const dashboards = tabs.map((t, i) => {
        return (
            <Dashboard key={i} theme={theme} data={data} loaded={loaded} defaultSet={defaultChosenSet} setDefaultSet={setDefaultChosenSet} className={classNames({'hidden': index !== i})}/>
        )
    })

    const tabButtons = tabs.map((t, i) => {
        return (
            <SelectButton key={i} className={classNames({'selected': index === i})} onClick={() => setIndex(i)}>dash {i+ 1}</SelectButton>
        )
    })

    return (
        <Wrapper>
            {loaded && <>
                <TabContainer>
                    {tabButtons}
                    <AddButton onClick={addTab}><StyledPlus /></AddButton>
                </TabContainer>
                {dashboards}
            </>}
        </Wrapper>
    )
}

export default Tabs;