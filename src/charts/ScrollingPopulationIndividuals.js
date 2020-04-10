import React, { Component } from 'react';
import { Scrollama, Step} from 'react-scrollama';

import { scaleLinear } from 'd3-scale';
import { interpolateHcl } from 'd3-interpolate';
import { easeSinInOut } from 'd3-ease';
import { select, selectAll } from 'd3-selection';
import { min, max } from 'd3-array';
import { nest } from 'd3-collection';

import Histogram from './Histogram';

import './styles/scrolling_graphic_styles.css';


class ScrollingPop extends Component {
    constructor(props){
        super(props);
        this.populations = this.props.data.map(d => d.pop).filter(unique);
        this.genCounts = this.populations.map(v => countIndividualsPerGeneration(this.props.data, v));
        this.maxPopVal = maxPerPop(this.genCounts);
        this.minPhen = min(this.props.data, d => d.ind_phen);
        this.maxPhen = max(this.props.data, d => d.ind_phen);
        this.phenRange = [this.minPhen, this.maxPhen];
        this.colorScale = scaleLinear()
            .domain([this.minPhen, 0, this.maxPhen])
            .range(['#4056a1', '#f1f0eb', '#f13c20'])
            .interpolate(interpolateHcl)
        this.state = {        
            data: {
                paddingBetweenIndividuals: 1.2,
                marginBetweenPops: 40,
                output_gen: 10000,
            }
        }


        this.directionVals = [
            calculateDimensionLong(this.props.squareSize, this.props.numCols, this.state.data.paddingBetweenIndividuals, this.state.data.marginBetweenPops, this.props.popDirection),
            calculateDimensionShort(this.maxPopVal, this.props.numCols, this.state.data.paddingBetweenIndividuals, this.props.squareSize, this.state.data.marginBetweenPops, this.props.popDirection)
        ]
    }

    popRef = React.createRef();

    createData(direction) {
        
        const numCols = this.props.numCols;
        const maxPopVal = this.maxPopVal;
        let filteredData = this.props.data.filter(d => d.mu === "1e-6" && d.m === "1e-4" && d.sigsqr === "25" && d.output_gen === this.state.data.output_gen)
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
            let xShifter = d * numCols * direction;
            let yShifter = d * Math.ceil(maxPopVal[d]/numCols) * (!direction);
            let currentYIndex = 1;
            let currentXIndex = 0;
            chosenData.filter(v => v.pop == d).forEach(function(r, i){
              if((i + 1)/(numCols) >= currentYIndex) {
                r['y'] = currentYIndex - 1 + yShifter;
                currentYIndex++
              } else {
                r['y'] = currentYIndex - 1 + yShifter;
              }
              if((i + 1) % (numCols) === 0){
                r['x'] = currentXIndex + xShifter;
                currentXIndex = 0
              } else {
                r['x'] = currentXIndex + xShifter;
                currentXIndex++;
              }
            })
          })
          return chosenData;
    }

    componentDidMount(){
        console.log(this.createData().filter(d => d.pop == 0).map(d => d.ind_phen))
        functs.create(this.popRef.current, this.createData(this.props.popDirection), this.props, this.state, this.colorScale(0))
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
                                             this.directionVals[0],
                                             this.directionVals[1]]
                                        }
                                   preserveAspectRatio="xMinYMid meet" 
                                   ref={this.popRef}
                                   className="pop-graphic">
                                </svg>
        return(
            <div className="scroller-main">
            <div className="scroller-graphic">
                <div className="histogram-charts">
                    <Histogram data={this.createData()}></Histogram>
                </div>
                <div className="population-charts">
                    {populationChart}
                </div>

              {/* <div className="scrolling-slider">
     
              </div> */}
              
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

const calculateDimensionLong =  (squareSize, numCols, individualPadding, popMargin, direction) =>  {
    const scale = 1 + direction;
    const marg = popMargin * direction;
    return (squareSize * numCols * individualPadding * scale) + marg;
}

const calculateDimensionShort = (maxPopObj, numCols, individualPadding, squareSize, popMargin, direction) => {
    const scale = 1 + !direction;
    return (Math.ceil(max(Object.values(maxPopObj))/ numCols) * scale * squareSize * individualPadding) + popMargin;
}


const definePosition = (data, squareSize, individualPadding, popMargin, addMargin, axis)  => {
    let k;
    let marg = data.pop * popMargin * addMargin;
    (axis === 0 ) ? k = 'x' : k = 'y';
    return ((data[k] * (individualPadding)) * squareSize) + marg
}

const functs = {
    create: (ref, data, props, state, colorScale) => select(ref).selectAll('.pop_rects').data(data).enter()
            .append('rect').attr('class', 'pop_rects')
            .attr('x', d => definePosition(d, props.squareSize, state.data.paddingBetweenIndividuals, state.data.marginBetweenPops, props.popDirection, 0))
            .attr('y', d => definePosition(d, props.squareSize, state.data.paddingBetweenIndividuals, state.data.marginBetweenPops, !props.popDirection, 1))
            .attr('rx', 2).attr('ry', 2).transition(easeSinInOut).duration(2000)
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