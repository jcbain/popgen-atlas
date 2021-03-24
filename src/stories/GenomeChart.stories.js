import React from 'react';

import GenomeChart from '../components/charts/GenomeChart'


export default {
  title: 'Charts/GenomeChart',
  component: GenomeChart,
};

const Template = (args) => <GenomeChart {...args} />;

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
