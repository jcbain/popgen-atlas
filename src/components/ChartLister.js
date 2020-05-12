import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

class ChartLister extends Component{
    
    render(){
        return(
            <div>
                <Card>
                    <CardContent>
                        <Typography>Line Chart</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Select</Button>
                    </CardActions>                </Card>
                <Card>
                    <CardContent>
                        <Typography>Genome Chart</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Select</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default ChartLister;