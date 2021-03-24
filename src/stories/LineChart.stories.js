import React from 'react';
import '../fonts/Roboto/Roboto-Regular.ttf'

import LineChart from '../components/charts/LineChart'


export default {
  title: 'Charts/LineChart',
  component: LineChart,
};

const Template = (args) => <LineChart {...args} />;

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