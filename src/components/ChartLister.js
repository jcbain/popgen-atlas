import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '20%',
    }
})

class ChartLister extends Component{
    constructor(props){
        super(props);
        this.state = {clicked: false}
    }

    render(){
 
        const clickAction = this.props.clickAction;
        const { classes } = this.props;
        const cards = this.props.labels.map((d,i) => {
            const action = () => this.props.clickActions[d.id](clickAction)
            return(
            <Card key={i} className={classes.root}>
                <CardContent>
                    <Typography>{d.labelReadable}</Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={action}>Select</Button>
                </CardActions>
            </Card>
            )
        })

        return(
            <div className="chart-cards">
                {cards}
            </div>
        )
    }
}

ChartLister.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ChartLister);