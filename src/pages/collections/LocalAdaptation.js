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
import Histogram from '../../charts/Histogram2';
import SimpleTabs, {AddTabs} from '../../components/Tabs';

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
    d['positional_phen'] = d0 - d1
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
    d['pop_phen'] = d['0']- d['1'];
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
    return (
      <div className="local-adaptation">
        {/* <section className="testChart">
          <Histogram data={individualData} width={200} height={200}>

          </Histogram>

        </section> */}
        <AddTabs maxNumTabs={4}
          data={data} 
          dataDiff={dataDiff}
          dataPopPhen={dataPopPhen} 
          dataPopPhenDiff={dataPopPhenDiff}
          template={template}
          params={this.state.params}

        >

        </AddTabs>

        <SimpleTabs data={data} 
          dataDiff={dataDiff}
          dataPopPhen={dataPopPhen} 
          dataPopPhenDiff={dataPopPhenDiff}
          template={template}
          params={this.state.params}
        
        ></SimpleTabs>

        {/* <section className="descriptive-chart">
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
                useLocalParams={true}
                identifier={uuidv4()}>
            </GeneArchGroup>
          </div>
        </section> */}
        
      {/* <section id="dashboard">
        <Dashboard className={'dashboard-local-adaptation'}
          data={data} 
          dataDiff={dataDiff}
          dataPopPhen={dataPopPhen} 
          dataPopPhenDiff={dataPopPhenDiff}
          template={template}
          params={this.state.params}>
        </Dashboard>
      </section> */}
      
      </div>


    )
  }
}





export default LocalAdaptation