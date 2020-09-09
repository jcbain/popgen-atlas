import React, { useEffect, useState } from 'react'
import { sum } from 'd3-array'
import { nest } from 'd3-collection';
import { v4 as uuidv4 } from 'uuid';
import { uniq, uniqBy, min, max } from 'lodash';
import {ThemeProvider} from 'styled-components';

import GenomeGradients from '../../components/Charts/GenomeArchitecture/GenomeGradients';
import { filterDataByParams } from '../../helpers/DataHelpers';
import template from '../../data/genome_template.json';
import fullGenome from '../../data/genome_data.json';
import AddTabs from '../../components/Tabs/Tabs';
import LoadingIcon from '../../components/Loading/LoadingIcon'
import LocalAdaptationDashboard from './Dashboards/LocalAdaptationDashboard'

import './styles/local_adaptation_styles.css';

// const genome = fullGenome.filter(d => d.output_gen <= 20000);


// let summedGenome = nest()
//   .key( d => [d.output_gen, d.pop, d.m, d.mu, d.r, d.sigsqr])
//   .rollup( v => {
//     const popPhen = sum(v, d => d.effect_size_freq);
//     const popPhenDiff = sum(v, d => d.effect_size_freq_diff * 2);
//     return v.reduce((prev, curr) => {
//       prev['output_gen'] = curr['output_gen'];
//       prev['pop'] = curr['pop'];
//       prev['m'] = curr['m'];
//       prev['mu'] = curr['mu'];
//       prev['r'] = curr['r'];
//       prev['sigsqr'] = curr['sigsqr'];
//       prev['pop_phen'] = popPhen;
//       prev['pop_phen_diff'] = popPhenDiff;
//       return prev;
//     }, {})
//   })
//   .entries(genome)
//   .map(d => d.value)



// const theme = {
//   sliderbar: '#e0e0e0',
//   color: {
//     main: '#fff',
//     secondary: '#6fa1c7',
//     grayMain: '#6e6e6e',
//     graySecondary: '#efefef',
//     grayTertiary: '#4a4a4a',
//     grayLight: '#d1d1d1',
//     background: '#F6F8FF',
//     backgroundLight: '#fafbff',
//   },
//   tickfont: 'Itim',
//   tickfill: '#6e6e6e',
//   handlecolor: '#2b2b2b',
//   slidercolor: '#e0e0e0',
//   thumbcolor: '#682CFE',
//   highcolorup: '#eb4034',
//   highcolordown: '#F0C23A',
//   colormid: '#fff',
//   lowcolorup: '#a3d7ff',
//   lowcolordown: '#682CFE',
//   highcolorgray: '#a1a1a1',
//   lowcolorgray: '#fff',
//   buttoncolor: '#682CFE',
//   buttoncoloralpha: 'rgba(103, 44, 254, .3)',
//   buttoncoloralpha2: 'rgba(103, 44, 254, .1)',
// }

// const themePop1 = {
//   popColorFocus: '#682CFE', 
//   popColorOutside: '#d6d6d6',
//   popColorAlpha: 'rgba(103, 44, 254, .5)',
// }

// const themePop2 = {
//   popColorFocus: '#F0C23A', // rgb(124, 161, 161)
//   popColorOutside: '#d6d6d6',
//   popColorAlpha: 'rgba(240, 194, 58, .5)',
// }

// const themes = {
//   "1": themePop1,
//   "2": themePop2,
// }

// const createObjectLabelValues = v => {
//   return {label: v, value: v}
// }


// const generation = uniq(genome.map(d => d.output_gen), true).map(createObjectLabelValues),
//       selection = uniq(genome.map(d => d.sigsqr), true).map(createObjectLabelValues),
//       recombination = uniq(genome.map(d => d.r), true).map(createObjectLabelValues),
//       mutation = uniq(genome.map(d => d.mu), true).map(createObjectLabelValues),
//       population = uniq(genome.map(d => d.pop), true).map(createObjectLabelValues),
//       migration = uniq(genome.map(d => d.m), true).map(createObjectLabelValues);

// const paramOptions = [
//   {paramName: 'm', paramNameReadable: 'migration' ,options: migration},
//   {paramName: 'mu', paramNameReadable: 'mutation', options: mutation},
//   {paramName: 'r', paramNameReadable: 'recombination', options: recombination},
//   {paramName: 'sigsqr', paramNameReadable: 'selection', options: selection},
//   {paramName: 'pop', paramNameReadable: 'population', options: population},
//   {paramName: 'output_gen', paramNameReadable: 'generation', options: generation},
// ]

// const readableLabels = {
//   'output_gen': 'generation',
//   'effect_size_freq_diff': 'locus effect size',
//   'pop_phen': 'mean pop genotypic value',
//   'pop_phen_diff': 'mean phenotypic divergence',
//   'effect_size_freq': 'genotypic value',
//   'ind': 'locus'
// }

// let uniqParamPermutations = uniqBy(genome.map(({ m, mu, sigsqr, r, pop}) => ({ m, mu, sigsqr, r, pop  })), (elem) => { return [elem['m'], elem['mu'], elem['sigsqr'], elem['pop'], elem['r']].join()})
// uniqParamPermutations.forEach( d => {
//   d['paramSetKey'] = `ps${uuidv4().slice(0, 8)}`;
// })

// const uniqGenerations = uniq(genome.map( d => d.output_gen))
// const colorMin = min(genome.map(g => g.effect_size_freq_diff)),
//       colorMax = max(genome.map(g => g.effect_size_freq_diff));



const LocalAdaptation = (props) => {
//   const [isLoaded, setIsLoaded] = useState(false)
//   const [grads, setgrads] = useState([]);





//   const createAllGrads = () => { 
//     let allGrads = []
//     uniqParamPermutations.forEach( (p, i) => {
//       const filteredData = filterDataByParams(genome, p);
//       let fullGenomeData = [];
//       uniqGenerations.forEach(g => {
//         const filteredGen = filteredData.filter(d => d.output_gen === g)
//         const emptyRow = {...filteredGen[0], position: undefined, select_coef: 0, freq: 0, effect_size_freq_diff: 0, effect_size_freq: 0};
//         template.forEach((t,i) => {
//           const position = t.position;
//           let match = filteredGen.find(v => v.position === position);
//           match = match !== undefined ? match : {...emptyRow, position: position};
//           match.ind = i;
//           fullGenomeData.push(match) 
//         })
//       })

//       const colorgrads = <GenomeGradients key={`color-${i}`}
//         data={fullGenomeData}
//         xVar={'output_gen'}
//         yVar={'ind'}
//         colorVar={'effect_size_freq_diff'}
//         colorMin={colorMin}
//         colorMax={colorMax}
//         genKey={p.paramSetKey}
//         />

//       const graygrads = <GenomeGradients key={`gray-${i}`}
//         data={fullGenomeData}
//         xVar={'output_gen'}
//         yVar={'ind'}
//         colorVar={'effect_size_freq_diff'}
//         colorMin={colorMin}
//         colorMax={colorMax}
//         genKey={p.paramSetKey}
//         useGrayScale={true}
//         />
//       allGrads.push(colorgrads)
//       allGrads.push(graygrads)

//   })
//   setgrads(allGrads)
//   }

// useEffect(() => {   
//   createAllGrads()

//   setIsLoaded(true)
// }, [])

// const display = isLoaded ? <AddTabs viewwidth={100}
// paramOptions={paramOptions}
// lineChartData={summedGenome}
// paramPermutationData={uniqParamPermutations}
// grads={[]}
// colorMin={colorMin}
// colorMax={colorMax}
// geneArchData={genome}
// template={template}
// identifier={'identifier'}
// maxTabs={4}
// readableLabels={readableLabels}
// themes={themes} /> : <LoadingIcon /> //<LoadingBar perc={.5}/>


  return (

    <>
      <p>
        It is pushing the envelope At the end of the customer journey. Without interfaces, you will lack architectures. Without interfaces, you will lack experiences. Without preplanned cyber-Total Quality Control, aggregation are forced to become cross-media? We think that most viral web-based applications use far too much XSL, and not enough OWL. Our feature set is unmatched in the industry, but our plug-and-play re-purposing and easy operation is invariably considered a remarkable achievement. A company that can synthesize courageously will (eventually) be able to transition easily. If all of this comes off as mixed-up to you, that's because it is! What does the commonly-accepted buzzword 'long-term' really mean? We pride ourselves not only on our robust feature set, but our granular integrated, value-added convergence and easy use is invariably considered a remarkable achievement taking into account this month's financial state of things! If all of this comes off as mixed-up to you, that's because it is! Quick: do you have a plan to become customized. Our end-to-end feature set is unparalleled, but our power to benchmark. We believe we know that it is better to streamline magnetically than to revolutionize transparently. It sounds wonderful, but it's 100 percent accurate! The experiences factor is 1000/60/60/24/7/365.

      </p>
      <LocalAdaptationDashboard />
    </>
    // <ThemeProvider theme={theme}>     
    //   <svg className="gradient-container">
    //     {grads}
    //   </svg>
    //   <section className={'dashboard'}>

    //     { display }

    //   </section>
    // </ThemeProvider>
  )

}

export default LocalAdaptation