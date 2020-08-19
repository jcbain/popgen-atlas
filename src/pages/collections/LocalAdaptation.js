import React, { Component } from 'react'
import { sum } from 'd3-array'
import { nest } from 'd3-collection';
import { v4 as uuidv4 } from 'uuid';
import { uniq } from 'lodash'


import data from '../../data/mutations_bg.json';
import {ThemeProvider} from 'styled-components';

// import individualData from '../../data/individuals_small';
import template from '../../data/genome_template.json';
import genome from '../../data/genome_data.json';

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

const summedGenome = nest()
  .key( d => [d.output_gen, d.pop, d.m, d.mu, d.r, d.sigsqr])
  .rollup( v => {
    const popPhen = sum(v, d => d.effect_size_freq);
    const popPhenDiff = sum(v, d => d.effect_size_freq_diff);
    return v.reduce((prev, curr) => {
      prev['output_gen'] = curr['output_gen'];
      prev['pop'] = curr['pop'];
      prev['m'] = curr['m'];
      prev['mu'] = curr['mu'];
      prev['r'] = curr['r'];
      prev['sigsqr'] = curr['sigsqr'];
      prev['pop_phen'] = popPhen;
      prev['pop_phen_diff'] = popPhenDiff;
      return prev;
    }, {})
  })
  .entries(genome)
  .map(d => d.value)


  // const dataPopPhenDiff = nest()
  // .key( d => [d.output_gen, d.m, d.mu, d.r, d.sigsqr])
  // .rollup( v => {
  //   return v.reduce((prev, curr) =>{
  //     prev['output_gen'] = curr['output_gen'];
  //     prev['m'] = curr['m'];
  //     prev['mu'] = curr['mu'];
  //     prev['r'] = curr['r'];
  //     prev['sigsqr'] = curr['sigsqr'];
  //     prev[curr['pop']] = curr.pop_phen
  //     return prev;
  //   }, {})
  // })
  // .entries(summedGenome)
  // .map(d => d.value)
  // .map(d => {
  //   d['pop_phen_diff'] = d['1']- d['2'];
  //   return d;
  // })

// const dataPopPhenDiff = nest()
//   .key( d => [d.output_gen, d.m, d.mu, d.r, d.sigsqr])
//   .rollup( v => {
//     return v.reduce((prev, curr) =>{
//       prev['output_gen'] = curr['output_gen'];
//       prev['m'] = curr['m'];
//       prev['mu'] = curr['mu'];
//       prev['r'] = curr['r'];
//       prev['sigsqr'] = curr['sigsqr'];
//       prev[curr['pop']] = curr.pop_phen
//       return prev;
//     }, {})
//   })
//   .entries(dataPopPhen)
//   .map(d => d.value)
//   .map(d => {
//     d['pop_phen'] = d['0']- d['1'];
//     return d;
//   })



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
  colormid: '#fff',
  lowcolorup: '#0082e6',
  lowcolordown: '#682CFE',
  highcolorgray: '#a1a1a1',
  lowcolorgray: '#fff',
  buttoncolor: '#682CFE',
  buttoncoloralpha: 'rgba(103, 44, 254, .3)',
}

const themePop1 = {
  popColorFocus: '#682CFE', 
  popColorOutside: '#d6d6d6',
  popColorAlpha: 'rgba(103, 44, 254, .5)',
}

const themePop2 = {
  popColorFocus: '#F0C23A', // rgb(124, 161, 161)
  popColorOutside: '#d6d6d6',
  popColorAlpha: 'rgba(240, 194, 58, .5)',
}

const themes = {
  "1": themePop1,
  "2": themePop2,
}


const generation = uniq(genome.map(d => d.output_gen), true).map(v => {
  return {label: v, value: v}
})

const selection = uniq(genome.map(d => d.sigsqr), true).map(v => {
  return {label: v, value: v}
})

const recombination = uniq(genome.map(d => d.r), true).map(v => {
  return {label: v, value: v}
})

const mutation = uniq(genome.map(d => d.mu), true).map(v => {
  return {label: v, value: v}
})

const population = uniq(genome.map(d => d.pop), true).map(v => {
  return {label: v, value: v}
})

const migration = uniq(genome.map(d => d.m), true).map(v => {
  return {label: v, value: v}
})

const paramOptions = [
  {paramName: 'm', paramNameReadable: 'migration' ,options: migration},
  {paramName: 'mu', paramNameReadable: 'mutation', options: mutation},
  {paramName: 'r', paramNameReadable: 'recombination', options: recombination},
  {paramName: 'sigsqr', paramNameReadable: 'selection', options: selection},
  {paramName: 'pop', paramNameReadable: 'population', options: population},
  {paramName: 'output_gen', paramNameReadable: 'generation', options: generation},
]

const readableLabels = {
  'output_gen': 'generation',
  'effect_size_freq_diff': 'pop genotypic difference',
  'pop_phen': 'mean pop genotypic value',
  'pop_phen_diff': 'mean pop genotypic diff',
  'effect_size_freq': 'genotypic value'
}



const LocalAdaptation = (props) => {

  return (
    <ThemeProvider theme={theme}>
      <section className={'dashboard'}>
        <AddTabs viewwidth={100}
          paramOptions={paramOptions}
          lineChartData={summedGenome}
          geneArchData={genome}
          template={template}
          identifier={'identifier'}
          maxTabs={4}
          readableLabels={readableLabels}
          themes={themes} />
      </section>
    </ThemeProvider>
  )

}





export default LocalAdaptation