import React from 'react';

import HistogramChart from '../components/charts/HistogramChart'
import useData from '../hooks/useData'


export default {
  title: 'Charts/HistogramChart',
  component: Wrapper,
};

const Template = (args) => <Wrapper {...args} />;

export const WithData = Template.bind({});
WithData.args = {
  variable: 'effect_size_freq_diff',
};

function Wrapper(props){
  const { gene, geneLoaded } = useData()

  return (
    <>
      {geneLoaded && <HistogramChart data={gene} {...props} />}
    </>
  )
}