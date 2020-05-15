import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles';

class ChartLister extends Component{
    constructor(props){
        super(props);
        this.state = {clicked: false}
    }

    render(){
        const StyledCard = styled(Card)`
            width: 40%;
            margin: 1vw;
        `
 
        const clickAction = this.props.clickAction;
        const cards = this.props.labels.map((d,i) => {
            const action = () => this.props.clickActions[d.id](clickAction)
            return(
            <StyledCard key={i} className={'single-card'}>
                <CardContent>
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