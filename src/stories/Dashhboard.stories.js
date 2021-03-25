import React from 'react';

import Dashboard from '../components/dashboards/Dashboard'



export default {
  title: 'Dashboards/Dashboard',
  component: Wrapper,
};

const Template = (args) => <Wrapper {...args} />;

export const WithData = Template.bind({});
WithData.args = {
  variable: 'effect_size_freq_diff',
  currentSet: "m0.001_mu1e-05_r0.00625_sigsqr25_n1000_pop1"
};

function Wrapper(props){

  return (
    <>
      <Dashboard {...props} />
    </>
  )
}