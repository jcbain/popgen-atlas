import React, { Component } from 'react'
import { sum } from 'd3-array'
import { nest } from 'd3-collection';
import { v4 as uuidv4 } from 'uuid';
import { uniq, uniqBy, uniqWith, union, unionBy, find, min, max } from 'lodash'
import GenomeGradients from '../../components/Charts/GenomeArchitecture/GenomeGradients';
import {filterDataByParams} from '../../helpers/DataHelpers'

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

let summedGenome = nest()
  .key( d => [d.output_gen, d.pop, d.m, d.mu, d.r, d.sigsqr])
  .rollup( v => {
    const popPhen = sum(v, d => d.effect_size_freq);
    const popPhenDiff = sum(v, d => d.effect_size_freq_diff * 2);
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

const smallGenome = genome.filter( d => d.output_gen < 50000)



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
  'effect_size_freq_diff': 'locus effect size',
  'pop_phen': 'mean pop genotypic value',
  'pop_phen_diff': 'mean phenotypic divergence',
  'effect_size_freq': 'genotypic value',
  'ind': 'locus'
}

// put key here for reference of set
let uniqParamPermutations = uniqBy(smallGenome.map(({ m, mu, sigsqr, r, pop}) => ({ m, mu, sigsqr, r, pop  })), (elem) => { return [elem['m'], elem['mu'], elem['sigsqr'], elem['pop'], elem['r']].join()})
uniqParamPermutations.map( d => {
  d['paramSetKey'] = `ps${uuidv4().slice(0, 8)}`;
})

const uniqGenerations = uniq(smallGenome.map( d => d.output_gen))
const colorMin = min(genome.map(g => g.effect_size_freq_diff)),
      colorMax = max(genome.map(g => g.effect_size_freq_diff));
const chartPadding = {left: 20, right: 5, top: 10, bottom: 40};
const heightScaler = 6.5;
const displayDimsFocus = {width: 36.5, height: 46.5}



const LocalAdaptation = (props) => {

  let allGrads = [];
uniqParamPermutations.map( (p, i) => {
  const filteredData = filterDataByParams(smallGenome, p);
  let fullGenomeData = [];
  uniqGenerations.map(g => {
    const filteredGen = filteredData.filter(d => d.output_gen === g)
    const emptyRow = {...filteredGen[0], position: undefined, select_coef: 0, freq: 0, effect_size_freq_diff: 0, effect_size_freq: 0};
    template.map((t,i) => {
      const position = t.position;
      let match = filteredGen.find(v => v.position === position);
      match = match !== undefined ? match : {...emptyRow, position: position};
      match.ind = i;
      fullGenomeData.push(match)
    })
  })
  const colorgrads = <GenomeGradients key={`color-${i}`}
    data={fullGenomeData}
    xVar={'output_gen'}
    yVar={'ind'}
    colorVar={'effect_size_freq_diff'}
    colorMin={colorMin}
    colorMax={colorMax}
    chartPadding={chartPadding}
    heightScaler={heightScaler}
    displayDims={displayDimsFocus}
    genKey={p.paramSetKey}
    />

  const graygrads = <GenomeGradients key={`gray-${i}`}
    data={fullGenomeData}
    xVar={'output_gen'}
    yVar={'ind'}
    colorVar={'effect_size_freq_diff'}
    colorMin={colorMin}
    colorMax={colorMax}
    chartPadding={chartPadding}
    heightScaler={heightScaler}
    displayDims={displayDimsFocus}
    genKey={p.paramSetKey}
    useGrayScale={true}
    />
  allGrads.push(colorgrads)
  allGrads.push(graygrads)

})



  return (
    <ThemeProvider theme={theme}>
      {/* <svg>
        {allGrads}
      </svg> */}
      <section className={'dashboard'}>
        <AddTabs viewwidth={100}
          paramOptions={paramOptions}
          lineChartData={summedGenome}
          paramPermutationData={uniqParamPermutations}
          grads={allGrads}
          colorMin={colorMin}
          colorMax={colorMax}
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