import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import ShowChartIcon from '@material-ui/icons/ShowChart';

class ChartLister extends Component{
    constructor(props){
        super(props);
        this.state = {clicked: false}
    }

    render(){
        const StyledCard = styled(Card)`
            width: 40%;
            margin: 1vw;
            background-color: #ffffff;
            box-shadow: 0px 0px 0px 0px rgba(168,168,168,1);
            border: 1px solid #f2f2f2;
        `
 
        const clickAction = this.props.clickAction;
        const cards = this.props.labels.map((d,i) => {
            const action = () => this.props.clickActions[d.id](clickAction)
            return(
            <StyledCard key={i} className={'single-card'}>
                <CardContent>
                    <ShowChartIcon></ShowChartIcon>
                    <Typography>{d.labelReadable}</Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={action}>Select</Button>
                </CardActions>
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