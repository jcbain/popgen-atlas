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
  outputGen: 20000,
  pop: 1,
  migration: 0.001,
  mutation: 1e-5,
  sigsqr: 25
};

function Wrapper(props){
  const { data, loaded } = useData()

  return (
    <>
      {loaded && <HistogramChart data={data} {...props} />}
    </>
  )
}