import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import ClearIcon from '@material-ui/icons/Clear';


import LineChartGroup from './LineChartGroup';
import GeneArchGroup from './GeneArchGroup'

import ChartLister from './ChartLister'


class DashboardComponent extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.state = {componentView: false,
                      selectedComponent: '',
                      params: {mu: '1e-6', m: '1e-4', r: '1e-6' , sigsqr: '25', output_gen: 1000, pop: 0}
                    };
    }

    handleClick(d){
        this.setState({componentView: d[0], selectedComponent: d[1]})
    }

    render(){
        const StyledChartLister = styled(ChartLister)`
            display: flex;
            justify-content: center;
        `

        const StyledClearIcon = styled(ClearIcon)`
            position: absolute;
            top: 0;
            right: 0;
            fill: #e8e8e8;
            &:hover {
                fill: palevioletred;
            }
        `

        const StyledDiv = styled.div`
            position: relative;
        `

        const charts = {
            geneArchGroup: <GeneArchGroup data={this.props.data}
                            template={this.props.template}
                            params={this.state.params}
                            useLocalParams={false}>
            </GeneArchGroup>,
            lineChartGroup: <LineChartGroup data={this.props.dataPopPhen}
                                            params={this.state.params}
                                            useLocalParams={false}></LineChartGroup>
        }

        const componentLabels = [
            // change this to where the key is some value and the label is also another value
            {geneArchGroup : 'Genome Chart', id: 'geneArchGroup', labelReadable: 'Genome Chart'},
            {lineChartGroup : 'Line Chart', id: 'lineChartGroup', labelReadable: 'Line Chart'}
        ]

        let paramFunctions = {};
        componentLabels.map(k => {
            return paramFunctions[k.id] = (event) => event([true, k.id])
        })


        let display;
        if(this.state.componentView){
            display = <StyledDiv>
                    {charts[this.state.selectedComponent]}
                    <StyledClearIcon onClick={() => this.setState({componentView: false, selectedComponent: ''})}></StyledClearIcon>
                    {/* <Button onClick={() => this.setState({componentView: false, selectedComponent: ''})} size="small">Remove</Button> */}
                </StyledDiv>
        } else {
            display = <StyledChartLister className={'chart-cards'}
                clickAction={this.handleClick} 
                labels={componentLabels}
                clickActions={paramFunctions}></StyledChartLister>
        }
        return(
            <div className={this.props.className}>
                {display}
            </div>
        )
    }
}


export default styled(DashboardComponent)`
    box-shadow: 0px 0px 1px 0px rgba(168,168,168,1);
    width: 50vw;  
    height: 80vh;
    margin-bottom: 1vh; 
`;