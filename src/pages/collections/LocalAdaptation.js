import React, { Component } from 'react'
import { sum } from 'd3-array'
import { nest } from 'd3-collection';
import styled from 'styled-components'

import data from '../../data/mutations_bg.json';
import individualData from '../../data/individuals_small';
import template from '../../data/genome_template.json';

import LineChartGroup from '../../components/LineChartGroup';
import GeneArchGroup from '../../components/GeneArchGroup';
import DashboardComponent from '../../components/DashboardComponent';
import ParameterCollection from '../../components/ParameterCollection';
import { findUniqParamOptions } from '../../helpers/DataHelpers';


import './styles/local_adaptation_styles.css';

data.forEach( d => 
  d['positional_phen'] = d.freq * d.select_coef);

const dataPopPhen = [];
nest().key( d => [d.output_gen, d.pop, d.m, d.mu, d.r, d.sigsqr])
      .rollup( v => sum(v, d => d.positional_phen))
      .entries(data)
      .forEach( d => {
        let vals = d.key.split(",");
        d['output_gen'] = parseInt(vals[0]);
        d['pop']        = vals[1];
        d['m']          = vals[2];
        d['mu']         = vals[3];
        d['r']          = vals[4];
        d['sigsqr']     = vals[5];
        d['pop_phen']   = d.value;
        dataPopPhen.push(d)
});

  
class LocalAdaptation extends Component {
  constructor(props){
    super(props);

    this.state = { 
      params: {mu: '1e-6', m: '1e-4', r: '1e-6' , sigsqr: '25', output_gen: 1000, pop: 0}
    }
  }



  render() {
    const StyledDashboardComponent = styled(DashboardComponent)`
      background-color: black;
      width: 50vw;
    `
    return (
      <div className="local-adaptation">

        <div className="text-container">
          <p className="text-start">Many species live in spatially heterogeneous environments, where the conditions that challenge their productivity vary from one place to another. For example, the natural range of lodgepole pine spans from the temperate climates of northern California up to the Canadian subarctic in the Yukon territory. One evolutionary response to heterogeneous environments is “local adaptation”, where different populations will adapt to the conditions they commonly encounter in their home range. This specialization arises by the gradual evolution of genetically-based differences in the traits that help mediate the organism’s survival and fecundity in its environment. Lodgepole pine seeds collected in the Yukon territory will be more cold-tolerant, set bud earlier in the fall, and grow more slowly than seeds collected in California. Local adaptation tends to involve constraints and trade-offs between traits, where it isn’t possible to optimise all traits at once. In the context of lodgepole pine, the Yukon-adapted genotypes avoid autumn frost damage by setting bud early, but this shorter growing season limits how much they can grow and compete. By contrast, the California genotypes grow much faster, but are more susceptible to cold injury and would die in the harsh northern winters. In some cases, a species may remain a generalist and not evolve any local adaptations, even if the environment varies considerably from one place to another. </p>
        </div>


        <section className="descriptive-chart">
          <div id="line-chart-group-1">
            <LineChartGroup data={dataPopPhen}
                params={this.state.params}
                useLocalParams={true}>
            </LineChartGroup>
          </div>
        </section>

        <section className="descriptive-chart">
        <div id="arch-chart-group-1">
            <GeneArchGroup data={data} 
                template={template}
                params={this.state.params}
                useLocalParams={false}>
            </GeneArchGroup>
          </div>
        </section>



        <p className="text-container">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Sit amet aliquam id diam maecenas ultricies mi eget. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Nibh venenatis cras sed felis. Viverra adipiscing at in tellus integer feugiat scelerisque. Velit ut tortor pretium viverra suspendisse potenti. Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam. Vitae elementum curabitur vitae nunc. Elementum facilisis leo vel fringilla est ullamcorper. Ullamcorper eget nulla facilisi etiam dignissim diam quis.</p>
        <p className="text-container">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Sit amet aliquam id diam maecenas ultricies mi eget. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Nibh venenatis cras sed felis. Viverra adipiscing at in tellus integer feugiat scelerisque. Velit ut tortor pretium viverra suspendisse potenti. Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam. Vitae elementum curabitur vitae nunc. Elementum facilisis leo vel fringilla est ullamcorper. Ullamcorper eget nulla facilisi etiam dignissim diam quis.</p>
        <p className="text-container">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Sit amet aliquam id diam maecenas ultricies mi eget. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Nibh venenatis cras sed felis. Viverra adipiscing at in tellus integer feugiat scelerisque. Velit ut tortor pretium viverra suspendisse potenti. Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam. Vitae elementum curabitur vitae nunc. Elementum facilisis leo vel fringilla est ullamcorper. Ullamcorper eget nulla facilisi etiam dignissim diam quis.</p>
        <p className="text-container">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Sit amet aliquam id diam maecenas ultricies mi eget. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Nibh venenatis cras sed felis. Viverra adipiscing at in tellus integer feugiat scelerisque. Velit ut tortor pretium viverra suspendisse potenti. Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam. Vitae elementum curabitur vitae nunc. Elementum facilisis leo vel fringilla est ullamcorper. Ullamcorper eget nulla facilisi etiam dignissim diam quis.</p>
      
      <section id="dashboard">
        <StyledDashboardComponent className={'dashboard-component'}
          data={data} 
          dataPopPhen={dataPopPhen} 
          template={template}>
        </StyledDashboardComponent>
      </section>
      
      </div>


    )
  }
}





export default LocalAdaptation