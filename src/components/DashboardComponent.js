import React, { Component } from 'react';
import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import { v4 as uuidv4 } from 'uuid';


import LineChartGroup from './LineChartGroup';
import GeneArchGroup from './GeneArchGroup'

import ChartLister from './ChartLister2'
import ParameterCollection from './ParameterCollection';



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
                        },
                    };
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
            padding-left: 1vw;
            padding-right: 1vw;
            padding-top: 1vh;
            padding-bottom: 1vh;
        `

        const StyledMainDiv = styled.div`
            box-shadow: 0px 0px 1px 0px rgba(168,168,168,1);
            margin-bottom: 1vh; 
            grid-area: ${this.props.gridArea};

        `

        const StyledParameterCollection = styled(ParameterCollection)`
            display: flex;
        `

        const charts = {
            geneArchGroup: <GeneArchGroup data={[this.props.data, this.props.dataDiff][this.state.switchOpts.geneArchGroup.dataOpt]}
                            template={this.props.template}
                            params={this.state.params}
                            useLocalParams={false}
                            identifier={this.identifier}>
            </GeneArchGroup>,
            lineChartGroup: <LineChartGroup data={[this.props.dataPopPhen, this.props.dataPopPhenDiff][this.state.switchOpts.lineChartGroup.dataOpt]}
                                            className={'dashboard-line-chart'}
                                            params={this.state.params}
                                            useLocalParams={false}
                                            specialOpts={this.state.specialOpts.lineChartGroup}></LineChartGroup>
        }

        const componentLabels = [
            {geneArchGroup : 'Genome Chart', id: 'geneArchGroup', labelReadable: 'Genome Chart', switchDiff: this.state.switchOpts.geneArchGroup.switchOpt},
            {lineChartGroup : 'Line Chart', id: 'lineChartGroup', labelReadable: 'Line Chart', staticOpts: {pop: [0, 1]}, switchDiff: this.state.switchOpts.lineChartGroup.switchOpt}
        ]

        const paramObj = {migration: 'm', mutation: 'mu', recombination: 'r', selection: 'sigsqr', generation: 'output_gen', population: 'pop'};
        let paramFunctions = {}
        Object.keys(paramObj).map(k => {
            paramFunctions[k] = (d) => this.setState(prevState => ({
                params: {
                    ...prevState.params,
                    [paramObj[k]] : d
                }

            }))
            return paramFunctions;
        })

        let display;
        if(this.state.componentView){
            display = <StyledDiv>
                    {charts[this.state.selectedComponent]}
                    <StyledClearIcon onClick={() => this.setState({componentView: false, selectedComponent: ''})}></StyledClearIcon>
                    {/* <Button onClick={() => this.setState({componentView: false, selectedComponent: ''})} size="small">Remove</Button> */}
                </StyledDiv>
        } else {
        
            display = <StyledDiv>
            <StyledChartLister className={'chart-cards'}
                handleClick={this.handleClick}
                handleMultiSelect={this.handleMultiSelect} 
                handleSwitchDiff={this.handleSwitchDiff}
                labels={componentLabels}
                ></StyledChartLister>
                
                <StyledParameterCollection className={`parameter-collection-${uuidv4()}`} data={this.props.paramMatrix}
                        labels={{migration: 'm', mutation: 'mu', recombination: 'r', selection: 'sigsqr', population: 'pop'}}
                        initParams={this.state.params}
                        paramFunc={paramFunctions}>
                </StyledParameterCollection>
            </StyledDiv>
        }
        return(
            <StyledMainDiv className={this.props.className}>
                {display}
            </StyledMainDiv>
        )
    }
}


export default DashboardComponent;