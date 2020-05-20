import React, { Component } from 'react'
import { sum } from 'd3-array'
import { nest } from 'd3-collection';
import { v4 as uuidv4 } from 'uuid';


import data from '../../data/mutations_bg.json';
import individualData from '../../data/individuals_small';
import template from '../../data/genome_template.json';

import LineChartGroup from '../../components/LineChartGroup';
import GeneArchGroup from '../../components/GeneArchGroup';
import Dashboard from '../../components/Dashboard';


import './styles/local_adaptation_styles.css';

data.forEach( d => 
  d['positional_phen'] = d.freq * d.select_coef);

const dataDiff = nest()
  .key(d => [d.output_gen, d.m, d.mu, d.r, d.sigsqr, d.position])
  .rollup( v => {
    return v.reduce((prev, curr) => {
      prev['output_gen'] = curr['output_gen'];
      prev['m'] = curr['m'];
      prev['mu'] = curr['mu'];
      prev['r'] = curr['r'];
      prev['sigsqr'] = curr['sigsqr'];
      prev['position'] = curr['position']
      prev[curr['pop']] = curr.positional_phen
      return prev;
    }, {})
  })
  .entries(data)
  .map(d => d.value)
  .map(d => {
    const d0 = (d['0'] === undefined) ? 0 : d['0']
    const d1 = (d['1'] === undefined) ? 0 : d['1']
    d['positional_phen'] = Math.abs(d0) - Math.abs(d1)
    return d;
  })

const dataPopPhen = nest()
  .key( d => [d.output_gen, d.pop, d.m, d.mu, d.r, d.sigsqr])
  .rollup( v => {
    const popPhen = sum(v, d => d.positional_phen);
    return v.reduce((prev, curr) => {
      prev['output_gen'] = curr['output_gen'];
      prev['pop'] = curr['pop'];
      prev['m'] = curr['m'];
      prev['mu'] = curr['mu'];
      prev['r'] = curr['r'];
      prev['sigsqr'] = curr['sigsqr'];
      prev['pop_phen'] = popPhen;
      return prev;
    }, {})
  })
  .entries(data)
  .map(d => d.value);

const dataPopPhenDiff = nest()
  .key( d => [d.output_gen, d.m, d.mu, d.r, d.sigsqr])
  .rollup( v => {
    return v.reduce((prev, curr) =>{
      prev['output_gen'] = curr['output_gen'];
      prev['m'] = curr['m'];
      prev['mu'] = curr['mu'];
      prev['r'] = curr['r'];
      prev['sigsqr'] = curr['sigsqr'];
      prev[curr['pop']] = curr.pop_phen
      return prev;
    }, {})
  })
  .entries(dataPopPhen)
  .map(d => d.value)
  .map(d => {
    d['pop_phen'] = Math.abs(d['0']) - Math.abs(d['1']);
    return d;
  })
  
class LocalAdaptation extends Component {
  constructor(props){
    super(props);

    this.state = { 
      params: {mu: '1e-6', m: '1e-4', r: '1e-6' , sigsqr: '25', output_gen: 1000, pop: 1}
    }
  }



  render() {
    console.log(data)
    console.log(dataPopPhenDiff);
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
            <GeneArchGroup data={dataDiff} 
                template={template}
                params={this.state.params}
                useLocalParams={true}
                identifier={uuidv4()}>
            </GeneArchGroup>
          </div>
        </section>



        <p className="text-container">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Sit amet aliquam id diam maecenas ultricies mi eget. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Nibh venenatis cras sed felis. Viverra adipiscing at in tellus integer feugiat scelerisque. Velit ut tortor pretium viverra suspendisse potenti. Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam. Vitae elementum curabitur vitae nunc. Elementum facilisis leo vel fringilla est ullamcorper. Ullamcorper eget nulla facilisi etiam dignissim diam quis.</p>
        <p className="text-container">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Sit amet aliquam id diam maecenas ultricies mi eget. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Nibh venenatis cras sed felis. Viverra adipiscing at in tellus integer feugiat scelerisque. Velit ut tortor pretium viverra suspendisse potenti. Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam. Vitae elementum curabitur vitae nunc. Elementum facilisis leo vel fringilla est ullamcorper. Ullamcorper eget nulla facilisi etiam dignissim diam quis.</p>
        <p className="text-container">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Sit amet aliquam id diam maecenas ultricies mi eget. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Nibh venenatis cras sed felis. Viverra adipiscing at in tellus integer feugiat scelerisque. Velit ut tortor pretium viverra suspendisse potenti. Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam. Vitae elementum curabitur vitae nunc. Elementum facilisis leo vel fringilla est ullamcorper. Ullamcorper eget nulla facilisi etiam dignissim diam quis.</p>
        <p className="text-container">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. Sit amet aliquam id diam maecenas ultricies mi eget. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Nibh venenatis cras sed felis. Viverra adipiscing at in tellus integer feugiat scelerisque. Velit ut tortor pretium viverra suspendisse potenti. Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam. Vitae elementum curabitur vitae nunc. Elementum facilisis leo vel fringilla est ullamcorper. Ullamcorper eget nulla facilisi etiam dignissim diam quis.</p>
      
      <section id="dashboard">
        <Dashboard className={'dashboard-local-adaptation'}
          data={data} 
          dataPopPhen={dataPopPhen} 
          template={template}
          params={this.state.params}>
        </Dashboard>
      </section>
      
      </div>


    )
  }
}





export default LocalAdaptation