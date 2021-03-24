import React from 'react';

import LineChart from '../components/charts/LineChart';
import useData from '../hooks/useData';


export default {
  title: 'Charts/LineChart',
  component: Wrapper,
};

const Template = (args) => <Wrapper {...args} />;

export const WithData = Template.bind({});
WithData.args = {
  xVar: 'output_gen',
  yVar: 'phen_diff',
  outputGen: 20000,
  pop: 1,
  migration: 0.001,
  mutation: 1e-5,
  sigsqr: 25
};

function Wrapper(props){
  const { phen, phenLoaded } = useData('effect_size_freq_diff');

  return (
    <>
      {phenLoaded && <LineChart data={phen} {...props} />}
    </>
  )
}