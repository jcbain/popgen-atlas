import React from 'react';

import GenomeChart from '../components/charts/GenomeChart'
import useData from '../hooks/useData'


export default {
  title: 'Charts/GenomeChart',
  component: Wrapper,
};

const Template = (args) => <Wrapper{ ...args}/>;

export const WithData = Template.bind({});
WithData.args = {
  xVar: 'output_gen',
  yVar: 'position',
};

function Wrapper(props){
  const { gene, geneLoaded } = useData()

  return (
    <>
      {geneLoaded && <GenomeChart data={gene} {...props} />}
    </>
  )
}
