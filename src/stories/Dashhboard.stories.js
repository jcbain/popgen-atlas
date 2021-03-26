import React from 'react';
import { ThemeProvider } from 'styled-components'

import Dashboard from '../components/dashboards/Dashboard'
import useTheme from '../hooks/useTheme'



export default {
  title: 'Dashboards/Dashboard',
  component: Wrapper,
};

const Template = (args) => <Wrapper {...args} />;

export const WithData = Template.bind({});
WithData.args = {
  variable: 'effect_size_freq_diff',
};

function Wrapper(props){
  const { theme } = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <Dashboard {...props} theme={theme}/>
    </ThemeProvider>
  )
}