// import React from 'react';

// import LocalAdaptationArticle from '../../components/Articles/LocalAdaptationArticle';


// const LocalAdaptation = () => {


//   return (
//     <>
//       <LocalAdaptationArticle />
//     </>
//   )
// }


// export default LocalAdaptation;











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

// const genome = fullGenome.filter(d => d.output_gen <= 20000);
const genome = fullGenome

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



const theme = {
  sliderbar: '#e0e0e0',
  color: {
    main: '#fff',
    secondary: '#6fa1c7',
    grayMain: '#6e6e6e',
    graySecondary: '#efefef',
    grayTertiary: '#4a4a4a',
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
  lowcolorup: '#a3d7ff',
  lowcolordown: '#682CFE',
  highcolorgray: '#a1a1a1',
  lowcolorgray: '#fff',
  buttoncolor: '#682CFE',
  buttoncoloralpha: 'rgba(103, 44, 254, .3)',
  buttoncoloralpha2: 'rgba(103, 44, 254, .1)',
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

const createObjectLabelValues = v => {
  return {label: v, value: v}
}


const generation = uniq(genome.map(d => d.output_gen), true).map(createObjectLabelValues),
      selection = uniq(genome.map(d => d.sigsqr), true).map(createObjectLabelValues),
      recombination = uniq(genome.map(d => d.r), true).map(createObjectLabelValues),
      mutation = uniq(genome.map(d => d.mu), true).map(createObjectLabelValues),
      population = uniq(genome.map(d => d.pop), true).map(createObjectLabelValues),
      migration = uniq(genome.map(d => d.m), true).map(createObjectLabelValues);

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

let uniqParamPermutations = uniqBy(genome.map(({ m, mu, sigsqr, r, pop}) => ({ m, mu, sigsqr, r, pop  })), (elem) => { return [elem['m'], elem['mu'], elem['sigsqr'], elem['pop'], elem['r']].join()})
uniqParamPermutations.forEach( d => {
  d['paramSetKey'] = `ps${uuidv4().slice(0, 8)}`;
})

const uniqGenerations = uniq(genome.map( d => d.output_gen))
const colorMin = min(genome.map(g => g.effect_size_freq_diff)),
      colorMax = max(genome.map(g => g.effect_size_freq_diff));


const LocalAdaptation = () => {
  const [loading, setLoading] = useState(true)
  const [ gradients, setGradients ] = useState([]);

  const createAllGrads = () => { 
    let allGrads = []
    uniqParamPermutations.forEach( (p, i) => {
      const filteredData = filterDataByParams(genome, p);
      let fullGenomeData = [];
      uniqGenerations.forEach(g => {
        const filteredGen = filteredData.filter(d => d.output_gen === g)
        const emptyRow = {...filteredGen[0], position: undefined, select_coef: 0, freq: 0, effect_size_freq_diff: 0, effect_size_freq: 0};
        template.forEach((t,i) => {
          const position = t.position;
          let match = filteredGen.find(v => v.position === position);
          match = match !== undefined ? match : {...emptyRow, position: position};
          match.ind = i;
          fullGenomeData.push(match) 
        })
      })

      const colorGradients = <GenomeGradients key={`color-${i}`}
        data={fullGenomeData}
        xVar={'output_gen'}
        yVar={'ind'}
        colorVar={'effect_size_freq_diff'}
        colorMin={colorMin}
        colorMax={colorMax}
        genKey={p.paramSetKey}
      />

      const gradGradients = <GenomeGradients key={`gray-${i}`}
        data={fullGenomeData}
        xVar={'output_gen'}
        yVar={'ind'}
        colorVar={'effect_size_freq_diff'}
        colorMin={colorMin}
        colorMax={colorMax}
        genKey={p.paramSetKey}
        useGrayScale={true}
      />

      allGrads.push(colorGradients, gradGradients)
  })
  setGradients(allGrads)
  }

useEffect(() => {   
  createAllGrads()
  setLoading(false)
}, [])

const dashboardDisplay = loading ? <LoadingIcon /> : <AddTabs viewwidth={100}
    paramOptions={paramOptions}
    lineChartData={summedGenome}
    paramPermutationData={uniqParamPermutations}
    colorMin={colorMin}
    colorMax={colorMax}
    geneArchData={genome}
    template={template}
    identifier={'identifier'}
    maxTabs={4}
    readableLabels={readableLabels}
    themes={themes} /> 

  return (
    <ThemeProvider theme={theme}> 
      {/* <p>
        We apply the proverb 'The proof of the customer journey. Our feature set is unparalleled in the industry, but our back-end performance and non-complex use is frequently considered a remarkable achievement taking into account this month's financial state of things! If all of this may seem marvelous, but it's realistic! Imagine a combination of VOIP and Flash. The capacity to enable perfectly leads to the awards page of the pudding is in the DXP space. We apply the proverb 'A rolling stone gathers no moss' not only to our front-end process management but our capability to drive. The capability to implement wirelessly leads to the ability to whiteboard without lessening our aptitude to disintermediate. Without development, you will lack cross-media CAE. Our end-to-end feature set is second to none, but our robust iteration and user-proof use is invariably considered a remarkable achievement. The capacity to enable perfectly leads to the awards page of the customer journey. Our feature set is second to none, but our strategic angel investors and user-proof use is frequently considered a terrific achievement. We will regenerate our aptitude to repurpose without lessening our aptitude to repurpose without lessening our aptitude to incubate without reducing our capability to implement wirelessly leads to the capacity to synthesize interactively.
      </p>  */}
      <svg className="gradient-container">
        { gradients }
      </svg>
      <section className={'dashboard'}>
        { dashboardDisplay }
      </section>
    </ThemeProvider>
  )

}


export default LocalAdaptation