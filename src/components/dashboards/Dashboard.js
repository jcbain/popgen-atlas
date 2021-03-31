import React from 'react';
import styled from 'styled-components';
import {useEffect, useState} from 'react'

import useData from '../../hooks/useData'
import useFilteredData from '../../hooks/useFilteredData'
import useParams from '../../hooks/useParams'
import HistogramChart from '../charts/HistogramChart';
import GenomeChart from '../charts/GenomeChart';
import LineChart from '../charts/LineChart';
import VariableParamBar from './VariableParamBar'
import ConstParamBar from './ConstParamBar';

// import TabState from '../tabs/TabState'

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";

const Wrapper = styled.div`
    width: 1200px;
    /* padding: 20px; */
    display: grid;
    grid-template-columns: 1fr .25fr;
    grid-template-rows: 70px 1fr;
    grid-template-areas: 
        "constbar varbar"
        "plots varbar";
    column-gap: 20px;
    background-color: ${({ theme }) => theme.dashboardBackground};
`

const Grid = styled.div`
    display: grid;
    padding: 20px;
    grid-template-columns: 0.3fr 1fr 1fr;
    grid-template-rows: 600px 600px 500px;
    grid-template-areas:
        'tab genome genome'
        'tab line hist';
    row-gap: 40px;
    column-gap: 40px;
`

const ChartHolder = styled.div`
    padding: 50px 40px;
    border-radius: 5px;
    border: 1px solid #efefef;
    background-color: ${({ theme }) => theme.chartCardBackground};
`


const Dashboard = ({theme}) => {

    const { data, loaded } = useData()
    const { paramOptions, chosenSet, changeParam } = useParams(data)
    const {genes, phens, geneLoaded, phenLoaded } = useFilteredData(data, loaded, 'effect_size_freq_diff', chosenSet)
    const [value, setValue] = useState(0);
    const [geneData, setGeneData] = useState();
    const [phenData, setPhenData] = useState()
    const [tabList, setTabList] = useState([{
        title: "D1",
        key: 0,
        id: 0
    }]);

    const maxTab = 4;

    useEffect(() => {
        setGeneData([genes]);
        setPhenData([phens]);
    },[genes,phens])


    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    }

    console.log(value)

    const handleAddTab = () => {
        let id = tabList[tabList.length - 1].id + 1;
    
        const newTab =  { 
            title: "D" + `${tabList.length+1}`, 
            key: id, 
            id: id}

        if (tabList.length <= maxTab) {
            setTabList([...tabList, newTab]);
            setGeneData([...geneData, genes]);
            setPhenData([...phenData, phens]);
        }
    }


    const handleDeleteTab = e => {
        e.stopPropagation();

        if (tabList.length === 1) {
            return;
        }
        let tabId = parseInt(e.target.id);
        let tabIDIndex = 0;
      
        let tabs = tabList.filter((value, index) => {
            if (value.id === tabId) {
                tabIDIndex = index;
            }
                return value.id !== tabId;
        });
      
        let curValue = parseInt(value);
        if (curValue === tabId) {
            if (tabIDIndex === 0) {
              curValue = tabList[tabIDIndex + 1].id;
            } else {
              curValue = tabList[tabIDIndex - 1].id;
            }
        }
        setValue(curValue);
        setTabList(tabs);
    };


    return (
        <Wrapper>
            <ConstParamBar style={{gridArea: 'constbar', paddingLeft: '20px', paddingTop: '10px', paddingRight: '20px'} } paramOptions={paramOptions}/>
            <Grid style={{gridArea: 'plots'} }>
                <Tabs 
                    value={value} 
                    onChange={handleChangeTab} 
                    orientation="vertical"
                    variant="scrollable" 
                    scrollButtons="auto" 
                    aria-label="chart tabs"
                    style={{width: "100px"}}
                    
                >
                    {tabList.map(tab => (
                        <Tab
                            key={tab.key}
                            value={tab.id}
                            label={tab.title}
                            icon={<Close 
                                id={tab.id} 
                                style={{ display: "inline-block", marginLeft:"-100px", fontSize: "15px", gridArea: "tab"}} 
                                onClick={handleDeleteTab}/>}
                            className="mytab"
                        />
                    ))}

                    <Button onClick={handleAddTab}>
                        <AddIcon/>
                    </Button>
                </Tabs>
                <ChartHolder style={{gridArea:'genome'}}>
                    {geneLoaded && <GenomeChart  data={geneData[value]} xVar={'output_gen'} yVar={'position'} colorVar={'effect_size_freq_diff'} theme={theme}  />}
                </ChartHolder>
                <ChartHolder style={{gridArea:'line'}}>
                    {phenLoaded && <LineChart  data={phenData[value]} xVar={'output_gen'} yVar={'phen_diff'} theme={theme}/>}

                </ChartHolder>
                <ChartHolder style={{gridArea:'hist'}}>

                    {geneLoaded && <HistogramChart  data={geneData[value]} variable={'effect_size_freq_diff'} groupVar={'output_gen'} theme={theme}/>}
                </ChartHolder>
            </Grid>
            <VariableParamBar style={{gridArea: 'varbar'} } paramOptions={paramOptions} changeParam={changeParam}/>
        </Wrapper>
    )
}

export default Dashboard;