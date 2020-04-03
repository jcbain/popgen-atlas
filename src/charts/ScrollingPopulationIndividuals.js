import React, { Component } from 'react';
import { Scrollama, Step} from 'react-scrollama';

import { scaleLinear } from 'd3-scale';
import { interpolateHcl } from 'd3-interpolate';
import { easeSinInOut } from 'd3-ease';
import { select, selectAll } from 'd3-selection';
import { min, max } from 'd3-array';
import { nest } from 'd3-collection';

import individualData from '../data/individuals_small';

import './styles/scrolling_graphic_styles.css';


class ScrollingPop extends Component {
    constructor(props){
        super(props);
        this.genCounts = individualData.map(d => d.pop).filter(unique).map(v => countIndividualsPerGeneration(individualData, v));
        this.populations = individualData.map(d => d.pop).filter(unique);
        this.maxPopVal = maxPerPop(this.genCounts);
        this.minPhen = min(individualData, d => d.ind_phen);
        this.maxPhen = max(individualData, d => d.ind_phen);
        this.phenRange = [this.minPhen, this.maxPhen];
        this.colorScale = scaleLinear()
            .domain([this.minPhen, 0, this.maxPhen])
            .range(['#4056a1', '#f1f0eb', '#f13c20'])
            .interpolate(interpolateHcl)
        this.state = {
            paddingBetweenIndividuals: 1.2,
            marginBetweenPops: 0,            
            data: {
                marginBetweenPops: 0,
                output_gen: 1000,
            }
        }
    }

    popRef = React.createRef();

    createData() {
        const numCols = this.props.numCols;
        let filteredData = individualData.filter(d => d.mu === "1e-6" && d.m === "1e-4" && d.sigsqr === "25" && d.output_gen == 1000)
        let smallest = min(filteredData, d => d.ind_phen);
        let biggest = max(filteredData, d => d.ind_phen);
        let chosenData = [];
        this.populations.map(d => {
          let val = d;
          let popIndexes = new Array(this.maxPopVal[val]);
          [...popIndexes.keys()].map(function(v) {
            let x = {};
            x['pop'] = val;
            let result = filteredData.filter(d => d.pop == val)[v];
            x['ind_phen'] = (result !== undefined) ? result.ind_phen : 0;
            x['biggest'] = (x['ind_phen'] === biggest) ? true : false;
            x['smallest'] = (x['ind_phen'] === smallest) ? true : false;

            chosenData.push(x);
          })
        })

        this.populations.map(d => {
            let shifter = d * numCols;
            let currentYIndex = 1;
            let currentXIndex = 0;
            chosenData.filter(v => v.pop == d).forEach(function(r, i){
              if((i + 1)/(numCols) >= currentYIndex) {
                r['y'] = currentYIndex - 1;
                currentYIndex++
              } else {
                r['y'] = currentYIndex - 1;
              }
              if((i + 1) % (numCols) === 0){
                r['x'] = currentXIndex + shifter;
                currentXIndex = 0
              } else {
                r['x'] = currentXIndex + shifter;
                currentXIndex++;
              }
            })
          })
          return chosenData;
    }

    componentDidMount(){
        functs.create(this.popRef.current, this.createData(), this.props, this.state, this.colorScale(0))
    }

    onStepEnter = ({ element, data}) => {
        console.log(data);
        if(data.onEnterChange){
          this.setState({data: data})
        }
      };
    
      onStepExit = ({ data, element }) => {
        if(data.onExitChange !== undefined){
          data.onExitChange()
        }
      };
    
      onStepProgress = ({ element, progress }) => {
        this.setState({ progress });
      }

    render(){

        let populationChart = <svg viewBox={[0, 
                                             0,
                                             (this.props.squareSize * this.props.numCols * this.state.paddingBetweenIndividuals * 2) - this.state.paddingBetweenIndividuals + this.state.marginBetweenPops,
                                             ((max(Object.values(this.maxPopVal))/ this.props.numCols) * this.state.paddingBetweenIndividuals * this.props.squareSize) + 100]
                                        }
                                   preserveAspectRatio="xMinYMid meet" 
                                   ref={this.popRef}
                                   className="pop-graphic">
                                </svg>
        return(
            <div className="scroller-main">
            <div className="scroller-graphic">
                {populationChart}
           
              <div className="scrolling-slider">
     
              </div>
              
            </div>

            <div className="scroller">
              <Scrollama
                onStepEnter={this.onStepEnter}
                onStepExit={this.onStepExit}
                progress
                onStepProgress={this.onStepProgress}
                offset={0.35}
                // debug
              >
              {stepsArray.map(value => (
                        <Step data={value} key={value.id}>
                            <div className="scroller-step">
                                {value.text}
                            </div>
                        </Step>
                    ))}
              </Scrollama>
            </div>

          </div>

            

        )
    }
}

const functs = {
    create: (ref, data, props, state, colorScale) => select(ref).selectAll('.pop_rects').data(data).enter()
            .append('rect').attr('class', 'pop_rects')
            .attr('x', (d, i) => {
                return ((d.x * (state.paddingBetweenIndividuals)) * props.squareSize) + d.pop * state.marginBetweenPops;
            })
            .attr('y', d => d.y * props.squareSize).attr('rx', 2).attr('ry', 2).transition(easeSinInOut).duration(2000)
            .attr('height', props.squareSize)
            .attr('width', props.squareSize)
            .attr('fill', colorScale) ,
    remove: () => selectAll('.pop_rects').transition().attr('width', 0).attr('height', 0).duration(1000).remove()
  }
  
  const stepsArray = [
    {
      id: 0,
      onEnterChange: false,
      onExitChange: functs.remove,
      step: 0,
      output_gen: 0,
      text: <p>This is some sample text Somethining here</p>,
      marginBetweenPops: 0,
    },
    {
      id: 1,
      onEnterChange: true,
      onExitChange: undefined,
      step: 0,
      output_gen: 1000,
      text: <p>At 1,000 generations out, you can still see that individual phenotypes between the two populations don't look too dissimilar from one another. These individuals <span className="try-this">here</span> are the most divergent indiduals between populations. From what we can tell, there is very little difference.</p>,
      marginBetweenPops: 50,
  
    }
  ]

const countIndividualsPerGeneration = (data, val) => nest()
    .key( d => [d.output_gen, d.pop, d.m, d.mu, d.r, d.sigsqr])
    .rollup( v => v.length)
    .entries(data.filter(r => r.pop === val));

const unique = (value, index, self) => {
    return self.indexOf(value) === index;
}

const maxPerPop = (data) => {
    let maxPop = {};
  
    Object.keys(data).map((key, i) => {
      maxPop[key] = max(data[key], d => d.value);
    })
    return maxPop;
  }

export default ScrollingPop;