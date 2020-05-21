import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AddBoxIcon from '@material-ui/icons/AddBox';

import { chooseMultiStaticOptions } from './CardActions'

const StyledCard = styled(Card)`
    width: 40%;
    padding-top: 1vh;
    padding-bottom: 1vh;
    margin: 1vw;
    background-color: #ffffff;
    box-shadow: 0px 0px 0px 0px rgba(168,168,168,1);
    border: 1px solid #f2f2f2;
    display: grid;
    grid-template-areas: "icon label button";
    justify-items: center;
    align-items: center;
    `;

const StyledAddBoxIcon = styled(AddBoxIcon)`
    fill: palevioletred;
    `

function LineChartCard(props){
    const clickAction = () => props.clickActions[props.identifier](props.handleClick)
    const staticFunctionObject = chooseMultiStaticOptions(props.labels)
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
        <StyledCard>
            <ShowChartIcon></ShowChartIcon>
            <Typography>{props.labelReadable}</Typography>
            <StyledAddBoxIcon onClick={clickAction}></StyledAddBoxIcon>
            {specialOpts}
        </StyledCard>
    )
}

function GenomeChartCard(props) {
    const clickAction = () => props.clickActions[props.identifier](props.handleClick)
    return (
        <StyledCard>
            <ShowChartIcon></ShowChartIcon>
            <Typography>{props.labelReadable}</Typography>
            <StyledAddBoxIcon onClick={clickAction}></StyledAddBoxIcon>
        </StyledCard>
    )
}

export const CardTemplates = {
    'lineChartGroup': LineChartCard,
    'geneArchGroup': GenomeChartCard,
}