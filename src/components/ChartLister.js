import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AddBoxIcon from '@material-ui/icons/AddBox';

class ChartLister extends Component{
    constructor(props){
        super(props);
        this.state = {clicked: false}
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

        const StyledAddBoxIcon = styled(AddBoxIcon)`
            fill: palevioletred;
        `
 
        const clickAction = this.props.clickAction;
        const cards = this.props.labels.map((d,i) => {
            const action = () => this.props.clickActions[d.id](clickAction)
            let specialOpts;
            if(d.staticOpts !== undefined){
                specialOpts = Object.keys(d.staticOpts).map(v => {
                    return(
                        <div key={v}>
                        <p>{v}</p>
                        {d.staticOpts[v].map(i => <button key={i} onClick={() => console.log(i)}>{i}</button>)}
                        </div>
                        
                    )

            })
                
            }
            return(
                <StyledCard key={i} className={'single-card'}>
                        <ShowChartIcon></ShowChartIcon>
                        <Typography>{d.labelReadable}</Typography>
                        {/* <Button onClick={action}><AddBoxIcon></AddBoxIcon></Button> */}
                        <StyledAddBoxIcon onClick={action}></StyledAddBoxIcon>
                        {specialOpts}
                </StyledCard>
                )
        })

        return(
            <div className={this.props.className}>
                {cards}
            </div>
        )
    }
}



export default ChartLister;