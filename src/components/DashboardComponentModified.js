import React, {useState, useEffect, useCallback} from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { v4 as uuidv4 } from 'uuid';

import LineChartGroup from './LineChartGroup';
import GeneArchGroup from './GeneArchGroup';
import ParameterCollection from './ParameterCollection';
import { Button } from '@material-ui/core';
import {pickBy, keys, toInteger} from 'lodash';


const StyledDashboardComponentDiv = styled.div`
    background-color: #ffffff;
    box-shadow: 0px 0px 1px 0px rgba(168,168,168,1);
    grid-area: ${props => props.gridArea.name};
    padding-top: 2vh;
    padding-left: 1vw;
    padding-right: 1vw;
    padding-bottom: 1vh;
`;

const ChartViewDiv = styled.div`
    position: relative;
    // width: 100%;
    // height: 100%;
`;

const StyledClearIcon = styled(ClearIcon)`
    position: absolute;
    top: 0;
    right: 0;
    fill: #e8e8e8;
    &:hover {
        fill: palevioletred;
    }
`

const ChartCardDiv = styled.div`
    display: grid;
    justify-items: center;
    align-items: center;
    cursor: pointer;
    width: 20vw;
    height: 10vh;
    background-color: #fff;
    box-shadow: 0px 1px 2px 0px rgba(168,168,168,1);
    border: 1px solid #f2f2f2;
    border-radius: 3px;
    font-family: 'Assistant', sans-serif;
    transition: .5s;
    &:hover {
        box-shadow: none;
        background-color: #ffdbbf;
        color: #fffff7;
        border: 1px solid #ffdbbf;
        font-weight: 600;
    }
`;

const CardViewDiv = styled(ChartViewDiv)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1vw;
    justify-items: center;
    align-items: center;
`;

const ChartOptionsDiv = styled(ChartViewDiv)`
    background-color: #ffffff;
    padding-left: 1vw;
    padding-right: 1vw;
`

const StyledParameterCollection = styled(ParameterCollection)`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

export const ChartView = (props) => {
    const identifier = uuidv4();
    
    const displayCharts = {
        lineChartGroup: (
            <LineChartGroup data={props.lineChartData}
                className={'component-line-chart-group'}
                params={props.params}
                useLocalParams={props.useLocalParams}
                specialOpts={props.paramOpts}
                displayDims={props.displayDims}
            >
            </LineChartGroup>
            ),
        geneArchGroup: (
            <GeneArchGroup data={props.geneArchData}
                template={props.template}
                params={props.params}
                useLocalParams={props.useLocalParams}
                identifier={identifier}
                displayDims={props.displayDims}
            >
            </GeneArchGroup>

        )

    };
    
    return (
        <ChartViewDiv>
            <StyledClearIcon onClick={props.xAction}></StyledClearIcon>
            {displayCharts[props.chosenChart]}
        </ChartViewDiv>
    )

}

const ChartCard = (props) => {
    const label = props.label.toUpperCase();
    return (
        <ChartCardDiv onClick={props.onClick}>{label}</ChartCardDiv>
    )
}

const ChartCardLister = (props) => {
    return(
        <CardViewDiv>
            <ChartCard label={'Line Chart'} onClick={props.onClickLineChartGroup}>Line Chart</ChartCard>
            <ChartCard label={'Genome Chart'} onClick={props.onClickGeneArchGroup}>Genome Chart</ChartCard>
        </CardViewDiv>
    )
}

const ParameterOptionCardDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: .25fr 1fr;
    align-items: start;
    margin-bottom: 2vh;
    border: 1px solid #f2f2f2;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-bottom: 0.5rem;
    border-radius: 3px;
`

const ParameterOptionTitle = styled.h2`
    font-family: 'Assistant', sans-serif;
    font-size: .9rem;
`

const ParameterOptionCard = (props) => {
    return (
        <ParameterOptionCardDiv>
            <ParameterOptionTitle>{props.description.toUpperCase()}</ParameterOptionTitle>
            {props.children}
        </ParameterOptionCardDiv>
    )
}

const AllParamOptionsDiv = styled.div`
    display: grid;
`;

const StyledFormGroup = styled(FormGroup)`
    && {
        display: flex;
        flex-direction: row;

        & .MuiSvgIcon-root {
            color: #ffdbbf;
            &:hover{
                background-color: blue !important;
            }
        }
    }

`

const PopulationSelectionCollection = (props) => {
    const checkOpts = props.specialParamOpts;

    const handleChange = (v) => () => {
        props.getSpecialParamOpts(props.name, v, checkOpts[v])    
    }

    const checkboxes = props.specialParamInit.map( d => {
        return (
            <FormControlLabel key={d}
                control={<Checkbox checked={checkOpts[d]} onChange={handleChange(d)} name={`${props.labelAddition}-${d}`} />}
                label={`${props.labelAddition} ${d}`}
            >

            </FormControlLabel>
        )
    })
    

    return (
        <StyledFormGroup>
            {checkboxes}
        </StyledFormGroup>
    )
}

const LineChartGroupOptions = (props) => {
    return(
        <AllParamOptionsDiv>
            <ParameterOptionCard key="params" 
                description={'choose your model parameters'}
                >
                <StyledParameterCollection className={`parameter-collection-${uuidv4()}`}
                    data={props.paramMatrix}
                    labels={{migration: 'm', mutation: 'mu', recombination: 'r', selection: 'sigsqr'}}
                    initParams={props.initParams}
                    gridArea={props.gridArea}
                    paramFunc={props.paramFunc}
                >
                </StyledParameterCollection>
            </ParameterOptionCard>
            <ParameterOptionCard key="pop" description={'choose your populations'}>
                <PopulationSelectionCollection
                    valueArray={[0, 1]}
                    name={'pop'}
                    labelAddition={'pop'}
                    specialParamInit={props.specialParamInit}
                    specialParamOpts={props.specialParamOpts.pop}
                    getSpecialParamOpts={props.getSpecialParamOpts}
                >

                </PopulationSelectionCollection>
            </ParameterOptionCard>
            <Button onClick={props.renderChart}>RENDER</Button>

        </AllParamOptionsDiv>
    )
}

const GenomeChartOptions = (props) => {

    return(
        <AllParamOptionsDiv>
            <ParameterOptionCard key="params" description={'choose your model parameters'}>
                <StyledParameterCollection className={`parameter-collection-${uuidv4()}`}
                        data={props.paramMatrix}
                        labels={{migration: 'm', mutation: 'mu', recombination: 'r', selection: 'sigsqr', population: 'pop'}}
                        initParams={props.initParams}
                        gridArea={props.gridArea}
                        paramFunc={props.paramFunc}
                    >
                    </StyledParameterCollection>
            </ParameterOptionCard>
            <Button onClick={props.renderChart}>RENDER</Button>
        </AllParamOptionsDiv>

    )
}

const ChartOptions = (props) => {
    const chartSpecificOptions = {
        lineChartGroup: (
            <LineChartGroupOptions paramMatrix={props.paramMatrix} 
                initParams={props.initParams}
                gridArea={props.gridArea}
                paramFunc={props.paramFunc}
                renderChart={props.renderChart}
                specialParamInit={props.specialParamInit}
                specialParamOpts={props.specialParamOpts}
                getSpecialParamOpts={props.getSpecialParamOpts}
            >

            </LineChartGroupOptions>
        ),
        geneArchGroup: (
            <GenomeChartOptions paramMatrix={props.paramMatrix} 
                initParams={props.initParams}
                gridArea={props.gridArea}
                paramFunc={props.paramFunc}
                renderChart={props.renderChart}
            >

            </GenomeChartOptions>
        )
    }

    return(
        <ChartOptionsDiv>
            <IconButton onClick={props.onBackClick} color="primary" aria-label="back" component="span">
                <ArrowBackIcon />
            </IconButton>
            {chartSpecificOptions[props.chosenChart]}
        </ChartOptionsDiv>
    )
}

export const DashboardComponentModified = (props) => {
    const [selectedChart, setSelectedChart] = useState({chartView: 'chartview', selectedChart: 'lineChartGroup'})
    const [params, setParams] = useState({mu: '1e-6', m: '1e-4', r: '1e-6' , sigsqr: '25', output_gen: 1000, pop: 0})
    const [specialParamOpts, setSpecialParamOpts] = useState({pop: {0: true, 1: true}})
    const popkeysObj = {pop: keys(pickBy(specialParamOpts['pop'])).map(d => toInteger(d))}

    const xAction = () => setSelectedChart({chartView: 'chartlister', selectedChart: ''});
    const chooseChart = (chartId) => () => setSelectedChart({chartView: 'chartoptions', selectedChart: chartId})
    const renderChart = () => setSelectedChart(prevState => {
        return {...prevState, chartView: 'chartview'}
    })
    const changeParamOption = (name, val) => {
        setParams(prevState => {
            return {...prevState, [name]: val}
        })
    }
    const getSpecialParamOpts = (name, option, value) => {
        setSpecialParamOpts(prevState => ({
            [name] : {
                ...prevState[[name]], [option]: !value
            }
        }))
    }

    let viewDisplay;
    switch (selectedChart.chartView){
        case('chartview'):
            viewDisplay = (
                <ChartView xAction={xAction}
                    lineChartData={props.dataPopPhen}
                    geneArchData={props.data}
                    template={props.template}
                    params={params}
                    useLocalParams={false}
                    paramOpts={popkeysObj}
                    displayDims={props.gridArea.displayDims}
                    chosenChart={selectedChart.selectedChart}
                >
                </ChartView>
            )
        break;
        case('chartlister'):
            viewDisplay = (
                    <ChartCardLister
                        onClickLineChartGroup={chooseChart('lineChartGroup')}
                        onClickGeneArchGroup={chooseChart('geneArchGroup')}>
                    </ChartCardLister>
            )
        break;
        case('chartoptions'):
                viewDisplay = (
                    <ChartOptions onBackClick={xAction} 
                        chosenChart={selectedChart.selectedChart}
                        initParams={params}
                        paramMatrix={props.paramMatrix}
                        gridArea={props.gridArea}
                        paramFunc={changeParamOption}
                        renderChart={renderChart}
                        specialParamInit={[0,1]}
                        specialParamOpts={specialParamOpts}
                        getSpecialParamOpts={getSpecialParamOpts}
                    >
                    </ChartOptions>
                )
        break;
        default: viewDisplay = <div></div>
    }
    

    return(
        <StyledDashboardComponentDiv 
            className={props.className}
            gridArea={props.gridArea}
        >
            {viewDisplay}

        </StyledDashboardComponentDiv>
    )

}