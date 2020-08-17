import React, { Component } from 'react'
import { sum } from 'd3-array'
import { nest } from 'd3-collection';
import { v4 as uuidv4 } from 'uuid';


import data from '../../data/mutations_bg.json';
import {ThemeProvider} from 'styled-components';

// import individualData from '../../data/individuals_small';
import template from '../../data/genome_template.json';

import {PlayGround} from '../../Playground'
import AddTabs from '../../components/Tabs/Tabs';

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



const theme = {
  color: {
    main: '#fff',
    secondary: '#6fa1c7',
    grayMain: '#6e6e6e',
    graySecondary: '#efefef',
    grayLight: '#d1d1d1',
    background: '#F6F8FF',
    backgroundLight: '#fafbff',
  },
  tickfont: 'Itim',
  tickfill: '#6e6e6e',
  handlecolor: '#2b2b2b',
  slidercolor: '#e0e0e0',
  thumbcolor: '#682CFE',
  highcolorup: '#eb4034',
  highcolordown: '#F0C23A',
  colormid: '#fffff7',
  lowcolorup: '#0082e6',
  lowcolordown: '#682CFE',
  highcolorgray: '#a1a1a1',
  lowcolorgray: '#fff',
  buttoncolor: '#682CFE',
  buttoncoloralpha: 'rgba(103, 44, 254, .3)',
}

const themePop0 = {
  popColorFocus: '#682CFE', 
  popColorOutside: '#d6d6d6',
  popColorAlpha: 'rgba(103, 44, 254, .5)',
}

const themePop1 = {
  popColorFocus: '#F0C23A', // rgb(124, 161, 161)
  popColorOutside: '#d6d6d6',
  popColorAlpha: 'rgba(240, 194, 58, .5)',
}

const themes = {
  "0": themePop0,
  "1": themePop1,
}


const LocalAdaptation = (props) => {

  return (
    <ThemeProvider theme={theme}>
      <section className={'dashboard'}>
        <AddTabs viewwidth={100}
          lineChartData={dataPopPhen}
          geneArchData={data}
          template={template}
          identifier={'identifier'}
          maxTabs={4}
          themes={themes} />
      </section>
    </ThemeProvider>
  )

}





export default LocalAdaptation