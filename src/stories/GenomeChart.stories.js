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
      {loaded && <GenomeChart data={data} {...props} />}
    </>
  )
}
