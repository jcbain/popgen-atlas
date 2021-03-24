import React from 'react';

import HistogramChart from '../components/charts/HistogramChart'


export default {
  title: 'Charts/HistogramChart',
  component: HistogramChart,
};

const Template = (args) => <HistogramChart {...args} />;

export const WithData = Template.bind({});
WithData.args = {
  variable: 'effect_size_freq_diff',
  outputGen: 20000,
  pop: 1,
  migration: 0.001,
  mutation: 1e-5,
  sigsqr: 25
};