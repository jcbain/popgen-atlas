import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AddBoxIcon from '@material-ui/icons/AddBox';

import { chooseMultiStaticOptions, chooseComponent } from './CardActions'

const StyledCard = styled(Card)`
    width: 40%;
    padding-top: 1vh;
    padding-bottom: 1vh;
    margin: 1vw;
    background-color: #ffffff;
    box-shadow: 0px 0px 0px 0px rgba(168,168,168,1);
    border: 1px solid #f2f2f2;
    display: grid;
    grid-template-areas: "icon label button"
                          "slider slider";
    justify-items: center;
    align-items: center;
    `;

const StyledAddBoxIcon = styled(AddBoxIcon)`
    fill: palevioletred;
    `

export function LineChartCard(props){
    // const clickAction = () => props.clickActions[props.identifier](props.handleClick)
    const clickAction = () => chooseComponent(props.labels)[props.identifier](props.handleClick)
    const staticFunctionObject = chooseMultiStaticOptions(props.labels)
    const switchDiff = () => props.handleSwitchDiff(props.identifier)
    let specialOpts;
    if(props.staticOpts !== undefined){
        specialOpts = Object.keys(props.staticOpts).map( v => {
            return(
                <div key={v}>
                <p>{v}</p>
                {props.staticOpts[v].map(i => <button key={i} 
                onClick={() => staticFunctionObject[props.identifier][v](props.handleMultiSelect, i)}
                >{i}</button>)}
            </div> 
                
            )
        })
    }
    return (
        <StyledCard key="linechart-card">
            <ShowChartIcon></ShowChartIcon>
            <Typography>{props.labelReadable}</Typography>
            <StyledAddBoxIcon onClick={clickAction}></StyledAddBoxIcon>
            {specialOpts}
            <FormControlLabel control={<Switch checked={props.switchDiff} onChange={switchDiff} name={props.identifier} />} label="Difference"></FormControlLabel>
        </StyledCard>
    )
}

export function GenomeChartCard(props) {

    const clickAction = () => chooseComponent(props.labels)[props.identifier](props.handleClick)
    const switchDiff = () => props.handleSwitchDiff(props.identifier)
    const switchFST = () => props.handleSwitchFST(props.identifier)
    return (
        <StyledCard key="genomechart-card">
            <ShowChartIcon></ShowChartIcon>
            <Typography>{props.labelReadable}</Typography>
            <StyledAddBoxIcon onClick={clickAction}></StyledAddBoxIcon>
            <FormControlLabel control={<Switch checked={props.switchDiff} onChange={switchDiff} name={props.identifier} />} label="Difference"></FormControlLabel>
            <FormControlLabel control={<Switch checked={props.switchFST} onChange={switchFST} name={props.identifier} />} label="FST"></FormControlLabel>
        </StyledCard>
    )
}

export const CardTemplates = {
    'lineChartGroup': LineChartCard,
    'geneArchGroup': GenomeChartCard,
}