import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AddBoxIcon from '@material-ui/icons/AddBox';

class ChartLister extends Component{
    constructor(props){
        super(props);
        this.state = {clicked: false}
    }

    componentDidUpdate(){
        console.log(this.state);
    }

    render(){
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

        function SecondaryCard(props) {
            return (
                <StyledCard>
                    <ShowChartIcon></ShowChartIcon>
                    <Typography>{props.labelReadable}</Typography>
                    <StyledAddBoxIcon onClick={props.action}></StyledAddBoxIcon>
                    {props.children}
                </StyledCard>
            )

        } 


        function TertiaryCard(props) {
            return (
                <StyledCard>
                    <ShowChartIcon></ShowChartIcon>
                    <Typography>{props.labelReadable}</Typography>
                    <AddBoxIcon onClick={props.action}></AddBoxIcon>
                    {props.children}
                </StyledCard>
            )

        } 

        const cardTypes = {
            'lineChartGroup': TertiaryCard,
            'geneArchGroup': SecondaryCard,
        }


        const StyledAddBoxIcon = styled(AddBoxIcon)`
            fill: palevioletred;
        `
 
        const handleClickAction = this.props.handleClick;
        const handleMultiSelect = this.props.handleMultiSelect;
        const cards = this.props.labels.map((d,i) => {
            const action = () => this.props.clickActions[d.id](handleClickAction)
            let specialOpts;
            if(d.staticOpts !== undefined){
                specialOpts = Object.keys(d.staticOpts).map(v => {
                    return(
                        <div key={v}>
                            <p>{v}</p>
                            {d.staticOpts[v].map(i => <button key={i} 
                            onClick={() => this.props.staticOptAction[d.id][v](handleMultiSelect, i)}
                            >{i}</button>)}
                        </div> 
                    )
                })   
            }
            return(
                // cardTypes[d.id]({labelReadable: d.labelReadable, action: action})
                <StyledCard key={i} className={'single-card'}>
                        <ShowChartIcon></ShowChartIcon>
                        <Typography>{d.labelReadable}</Typography>
                        {/* <Button onClick={action}><AddBoxIcon></AddBoxIcon></Button> */}
                        <StyledAddBoxIcon onClick={action}></StyledAddBoxIcon>
                        {specialOpts}
                </StyledCard>
                )}
        )

        return(
            <div className={this.props.className}>
                {cards}
            </div>
        )
    }
}



export default ChartLister;