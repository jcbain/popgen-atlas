import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class ChartLister extends Component{
    
    render(){
        return(
            <div>
                <Card>
                    <CardContent>
                        <Typography>Line Chart</Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography>Genome Chart</Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default ChartLister;