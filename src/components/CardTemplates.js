import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
import Avatar from '@material-ui/core/Avatar';


import { chooseComponent } from './CardActions'
import { Button, CardActions, Divider } from '@material-ui/core';

const StyledCard = styled(Card)`
    &&{
        width: 45%;
        padding-top: 1vh;
        padding-bottom: 1vh;
        margin: .5vw;
        background-color: #ffffff;
        box-shadow: 0px 0px 0px 0px rgba(168,168,168,1);
        border: 1px solid #f2f2f2;

    }
    `;

const StyledCardContent = styled(CardContent)`
    && {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-items: center;
        align-items: center;
    }
`;

const LineChartCollapse = styled(Collapse)`
    && {
        padding-left: 1.5vw;
        padding-right: 1.5vw;
        & .MuiCollapse-wrapperInner{
            display: grid;
            grid-template-rows: 1fr 1fr;
        }

    }
`

const GenomeChartCollapse = styled(Collapse)`
    && {
        padding-left: 1.5vw;
        padding-right: 1.5vw;
        & .MuiCollapse-wrapperInner{
            display: grid;
            grid-template-rows: 1fr;
        }

    }
`
const ChipDiv = styled.div`
    display: flex;
    flex-direction: row;

`
const StyledChip = styled(Chip)`
    && {
        margin-left: 2px;
        width: 72px;
        // height: 22px;
        color: ${props => props.labelcolor};
        border: .5px solid ${props => props.bordercolor};
        background-color: ${props => props.newcolor};
        &:focus{
            background-color: ${props => props.newcolor};
        }
    }
`;

const StyledAddBoxIcon = styled(AddBoxIcon)`
    &&{
        font-size: xxx-large;
        fill: palevioletred;
    }
    `
const StyledTypography = styled(Typography)`
    && {
        font-size: (1vh + 1vw)/2;
    }
`;


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
                    <FormLabel>Select Populations</FormLabel>
                    <ChipDiv>
                    {props.staticOpts[v].map(i => <StyledChip component='div'
                        onClick={() => handleDisable(i)} 
                        key={i} 
                        label={`pop ${i}`}
                         newcolor={disabled[i]? "#fff" : "rgb(236, 225, 253)"} 
                         labelcolor={disabled[i]? "#cccacb" : "rgb(163, 99, 252)"} 
                         bordercolor={disabled[i]? "#f2f0f1" :"rgb(218, 199, 250)"}
                         >
                         </StyledChip> )}
                         </ChipDiv>
                </FormControl>
            )
        })
    }
    return (
        <StyledCard key="linchart-cart">
            <StyledCardContent className="linechart-header">
                <ShowChartIcon></ShowChartIcon>
                <StyledTypography>{props.labelReadable}</StyledTypography>
                {/* <IconButton onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more">
                    <ExpandMoreIcon />
                </IconButton> */}
                <StyledAddBoxIcon onClick={clickAction}></StyledAddBoxIcon>
            </StyledCardContent>
            <Divider variant="middle"></Divider>
            <LineChartCollapse className="linechart-collapse" in={expanded} timeout="auto" unmountOnExit={false} >
                <FormControlLabel label="Difference" control={<Switch checked={switched} onChange={handleSwitch}></Switch>}></FormControlLabel>
                {populationOpts}
            </LineChartCollapse>
            <CardActions onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more">
                <Button>{!expanded ? 'Expand': 'Collapse'}</Button>
            </CardActions>
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
            <StyledCardContent className="genomechart-header">
                <ShowChartIcon></ShowChartIcon>
                <StyledTypography>{props.labelReadable}</StyledTypography>
                {/* <IconButton onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more">
                    <ExpandMoreIcon />
                </IconButton> */}
                <StyledAddBoxIcon onClick={clickAction}></StyledAddBoxIcon>
            </StyledCardContent>
            <Divider variant="middle"></Divider>
            <GenomeChartCollapse in={expanded} timeout="auto" unmountOnExit={false} >
                <FormControlLabel label="Difference" control={<Switch checked={switched} onChange={handleSwitch}></Switch>}></FormControlLabel>
            </GenomeChartCollapse>
            <CardActions onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more">
                <Button>{!expanded ? 'Expand': 'Collapse'}</Button>
            </CardActions>
            {/* <FormControlLabel control={<Switch checked={props.switchDiff} onChange={switchDiff} name={`${props.identifier}-diff`} />} label="Difference"></FormControlLabel>
            <FormControlLabel control={<Switch checked={props.switchFST} onChange={switchFST} name={`${props.identifier}-fst`} />} label="FST"></FormControlLabel> */}
        </StyledCard>
    )
}

export const CardTemplates = {
    'lineChartGroup': LineChartCard,
    'geneArchGroup': GenomeChartCard,
}