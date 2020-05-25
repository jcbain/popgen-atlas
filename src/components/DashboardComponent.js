import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import ClearIcon from '@material-ui/icons/Clear';
import { v4 as uuidv4 } from 'uuid';


import LineChartGroup from './LineChartGroup';
import GeneArchGroup from './GeneArchGroup'

import ChartLister from './ChartLister2'


class DashboardComponent extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.handleMultiSelect = this.handleMultiSelect.bind(this)
        this.handleSwitchDiff = this.handleDiffSwitch.bind(this);
        this.identifier = uuidv4();
        this.state = {componentView: false,
                      selectedComponent: '',
                      params: {mu: '1e-6', m: '1e-4', r: '1e-6' , sigsqr: '25', output_gen: 1000, pop: 0},
                      specialOpts: {lineChartGroup: {pop: [0, 1]}},
                      switchOpts: {
                            geneArchGroup: { 
                                switchOpt: false, dataOpt: 0
                            },
                            lineChartGroup: {
                                switchOpt: false, dataOpt: 0
                            }
                        }
                    };
    }

    componentDidUpdate(){
        console.log(this.state)
    }

    handleDiffSwitch(d){
        const componentKey = d;
        const newSwitchOpt = !this.state.switchOpts[[componentKey]].switchOpt
        const dataIndex = this.state.switchOpts[[componentKey]].dataOpt === 0 ? 1 : 0;
        // this.setState({switchOpts: { geneArchGroup: {switchOpt : !this.state.switchOpts.geneArchGroup.switchOpt, dataOpt: dataIndex} }})
        this.setState(prevState => ({
            switchOpts: {
                ...prevState.switchOpts,
                [componentKey] : { 
                    switchOpt: newSwitchOpt, 
                    dataOpt: dataIndex
                }
                
            }
        }))
    }

    handleClick(d){
        this.setState({componentView: d[0], selectedComponent: d[1]})
    }

    handleMultiSelect(d){
        const componentLabel = d[0];
        const paramLabel = d[1];
        const paramValue = d[2];

        if(this.state['specialOpts'][componentLabel][paramLabel].includes(paramValue)){
            this.setState(prevState => ({
                ...prevState.specialOpts,
                specialOpts : { 
                    [componentLabel] : {
                        [paramLabel] : [...prevState['specialOpts'][componentLabel][paramLabel]].filter(val => val !== paramValue)
                    }
                }

            }))
        } else {
            this.setState(prevState => ({
                ...prevState.specialOpts,
                specialOpts : { 
                    [componentLabel] : {
                        [paramLabel] : [...prevState['specialOpts'][componentLabel][paramLabel], paramValue]
                    }
                }

            }))

        }
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
            geneArchGroup: <GeneArchGroup data={[this.props.data, this.props.dataDiff][this.state.switchOpts.geneArchGroup.dataOpt]}
                            template={this.props.template}
                            params={this.props.params}
                            useLocalParams={false}
                            identifier={this.identifier}>
            </GeneArchGroup>,
            lineChartGroup: <LineChartGroup data={[this.props.dataPopPhen, this.props.dataPopPhenDiff][this.state.switchOpts.lineChartGroup.dataOpt]}
                                            params={this.props.params}
                                            useLocalParams={false}
                                            specialOpts={this.state.specialOpts.lineChartGroup}></LineChartGroup>
        }

        const componentLabels = [
            {geneArchGroup : 'Genome Chart', id: 'geneArchGroup', labelReadable: 'Genome Chart', switchDiff: this.state.switchOpts.geneArchGroup.switchOpt},
            {lineChartGroup : 'Line Chart', id: 'lineChartGroup', labelReadable: 'Line Chart', staticOpts: {pop: [0, 1]}, switchDiff: this.state.switchOpts.lineChartGroup.switchOpt}
        ]

        let display;
        if(this.state.componentView){
            display = <StyledDiv>
                    {charts[this.state.selectedComponent]}
                    <StyledClearIcon onClick={() => this.setState({componentView: false, selectedComponent: ''})}></StyledClearIcon>
                    {/* <Button onClick={() => this.setState({componentView: false, selectedComponent: ''})} size="small">Remove</Button> */}
                </StyledDiv>
        } else {
            display = <StyledChartLister className={'chart-cards'}
                handleClick={this.handleClick}
                handleMultiSelect={this.handleMultiSelect} 
                handleSwitchDiff={this.handleSwitchDiff}
                labels={componentLabels}
                ></StyledChartLister>
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
    width: 40vw;  
    height: 80vh;
    margin-bottom: 1vh; 
`;