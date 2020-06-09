import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Chip from '@material-ui/core/Chip';
import {omitBy, keys, toInteger} from 'lodash'


import { chooseComponent } from './CardActions'
import { Button } from '@material-ui/core';

const StyledCard = styled(Card)`
    &&{
        width: 40%;
        padding-top: 1vh;
        padding-bottom: 1vh;
        margin: 1vw;
        background-color: #ffffff;
        box-shadow: 0px 0px 0px 0px rgba(168,168,168,1);
        border: 1px solid #f2f2f2;
        display: grid;
        grid-template-columns: .25fr 1fr .25fr .5fr;
        justify-items: center;
        align-items: center;
    }
    `;

const StyledAddBoxIcon = styled(AddBoxIcon)`
    &&{
        font-size: xx-large;
        fill: palevioletred;
    }
    `


export function LineChartCard(props){
    
    const [expanded, setExpanded] = useState(false);
    const [switched, setSwitched] = useState(props.switchDiff);
    const [disabled, setDisabled] = useState({0: props.specialOpts.pop.includes(0) ? false : true, 1: props.specialOpts.pop.includes(1) ? false : true})
    const handleExpandClick = (event) => {
        setExpanded(!expanded);
    };
    const handleSwitch = () => setSwitched(!switched)
    const handleDisable = (i) => {
        const disabledNow = !disabled[i]
        setDisabled({...disabled, [i]: disabledNow})
    }
    const clickAction = (event) => {
        props.handleSwitchDiff(event, props.identifier, switched)
        props.handleMultiSelect([props.identifier, 'pop', keys(omitBy(disabled)).map(d => toInteger(d))])
        chooseComponent(props.labels)[props.identifier](props.handleClick)
    };
    let populationOpts;
    if(props.staticOpts !== undefined){
        populationOpts = Object.keys(props.staticOpts).map( v => {
            return(
                <FormControl>
                    <FormLabel component="legend">Population</FormLabel>
                    {props.staticOpts[v].map(i => <Chip onClick={() => handleDisable(i)} key={i} label={i} variant={disabled[i]? "outlined" : "default"}></Chip> )}
                </FormControl>
            )
        })
    }
    return (
        <StyledCard key="linchart-cart">
            <ShowChartIcon></ShowChartIcon>
            <Typography>{props.labelReadable}</Typography>
            <IconButton onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more">
                <ExpandMoreIcon />
            </IconButton>
            <StyledAddBoxIcon onClick={clickAction}></StyledAddBoxIcon>
            <Collapse in={expanded} timeout="auto" unmountOnExit={false} >
                <FormControlLabel label="Difference" control={<Switch checked={switched} onChange={handleSwitch}></Switch>}></FormControlLabel>
                 {populationOpts}
            </Collapse>
        </StyledCard>
    )
}

export function GenomeChartCard(props) {
    const [expanded, setExpanded] = useState(false);
    const [switched, setSwitched] = useState(props.switchDiff);
    const handleExpandClick = (event) => {
        setExpanded(!expanded);
    };
    const handleSwitch = () => setSwitched(!switched)
    const clickAction = (event) => {
        props.handleSwitchDiff(event, props.identifier, switched)
        chooseComponent(props.labels)[props.identifier](props.handleClick)
    };
    // const switchDiff = (event) => props.handleSwitchDiff(event ,props.identifier)
    // const switchFST = (event) => props.handleSwitchFST(event, props.identifier)
    return (
        <StyledCard key="genomechart-card">
            <ShowChartIcon></ShowChartIcon>
            <Typography>{props.labelReadable}</Typography>
            <IconButton onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more">
                <ExpandMoreIcon />
            </IconButton>
            <StyledAddBoxIcon onClick={clickAction}></StyledAddBoxIcon>
            <Collapse in={expanded} timeout="auto" unmountOnExit={false} >
                <FormControlLabel label="Difference" control={<Switch checked={switched} onChange={handleSwitch}></Switch>}></FormControlLabel>
            </Collapse>
            {/* <FormControlLabel control={<Switch checked={props.switchDiff} onChange={switchDiff} name={`${props.identifier}-diff`} />} label="Difference"></FormControlLabel>
            <FormControlLabel control={<Switch checked={props.switchFST} onChange={switchFST} name={`${props.identifier}-fst`} />} label="FST"></FormControlLabel> */}
        </StyledCard>
    )
}

export const CardTemplates = {
    'lineChartGroup': LineChartCard,
    'geneArchGroup': GenomeChartCard,
}