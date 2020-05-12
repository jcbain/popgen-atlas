import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

class ChartLister extends Component{
    constructor(props){
        super(props);
        // this.onClick = this.onClick.bind(this)
        this.state = {clicked: false}
    }

    // onClick(){
    //     this.setState({clicked: true})
    //     this.props.clickAction(this.state.clicked)
    // }


    render(){
        const clickAction = this.props.clickAction;
        const onClick = () => {
            clickAction(true);
        }

        return(
            <div>
                <Card>
                    <CardContent>
                        <Typography>Line Chart</Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={onClick} size="small" >Select</Button>
                    </CardActions>                </Card>
                <Card>
                    <CardContent>
                        <Typography>Genome Chart</Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={onClick} size="small">Select</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default ChartLister;