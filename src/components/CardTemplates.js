import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import CardHeader from '@material-ui/core/CardHeader';


import { chooseMultiStaticOptions, chooseComponent } from './CardActions'
import { Button } from '@material-ui/core';

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
    &&{
        fill: palevioletred;
    }
    `


export function LineChartCard(props){
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
        <StyledCard key="linchart-cart">
            <Typography>{props.labelReadable}</Typography>
            <StyledAddBoxIcon onClick={clickAction}></StyledAddBoxIcon>
            <IconButton onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more">
                <ExpandMoreIcon />
            </IconButton>
            <Collapse in={expanded} timeout="auto" unmountOnExit={false} >
                 <Switch checked={switched} onChange={handleSwitch}></Switch>
            </Collapse>
        </StyledCard>
    //     <StyledCard key="linechart-card">
    //         <ShowChartIcon></ShowChartIcon>
    //         <Typography>{props.labelReadable}</Typography>
    //         <StyledAddBoxIcon onClick={clickAction}></StyledAddBoxIcon>
            
    //         <IconButton
    //             onClick={handleExpandClick}
    //             aria-expanded={expanded}
    //             aria-label="show more"
    //         >
    //             <ExpandMoreIcon />
    //         </IconButton>
    //         <Collapse in={expanded} timeout="auto">
    //         <FormControlLabel aria-label="clicky" onClick={event => event.stopPropagation()} onFocus={event => event.stopPropagation()} control={<Switch checked={props.switchDiff} onChange={switchDiff} name={props.identifier} />} label="Difference"></FormControlLabel>
    //         {specialOpts}
    //   </Collapse>
    //     </StyledCard>
    )
}

export function GenomeChartCard(props) {

    const clickAction = () => chooseComponent(props.labels)[props.identifier](props.handleClick)
    const switchDiff = (event) => props.handleSwitchDiff(event ,props.identifier)
    const switchFST = (event) => props.handleSwitchFST(event, props.identifier)
    return (
        <StyledCard key="genomechart-card">
            <ShowChartIcon></ShowChartIcon>
            <Typography>{props.labelReadable}</Typography>
            <StyledAddBoxIcon onClick={clickAction}></StyledAddBoxIcon>
            <FormControlLabel control={<Switch checked={props.switchDiff} onChange={switchDiff} name={`${props.identifier}-diff`} />} label="Difference"></FormControlLabel>
            <FormControlLabel control={<Switch checked={props.switchFST} onChange={switchFST} name={`${props.identifier}-fst`} />} label="FST"></FormControlLabel>
        </StyledCard>
    )
}

export const CardTemplates = {
    'lineChartGroup': LineChartCard,
    'geneArchGroup': GenomeChartCard,
}