import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import useTheme from '../hooks/useTheme';
import useFonts from '../hooks/useFonts';
import GlobalStyle from '../themes/GlobalStyles'
import Navigation from '../components/pageComponents/Navigation'


export default {
  title: 'PageComponents/Navigation',
  component: Wrapper,
};

const Template = (args) => <Wrapper {...args} />;

export const Full = Template.bind({});
Full.args = {
  name: "Atlas of Population Genetics",
  links: [ {name: 'articles', link: '/articles' }, {name: 'dashboards', link: '/dashboards'},  {name: 'about', link: '/about'}],
  isFullView: true
};

export const Small = Template.bind({});
Small.args = {
  name: "Atlas of Population Genetics",
  links: [ {name: 'articles', link: '/articles' }, {name: 'dashboards', link: '/dashboards'}, {name: 'about', link: '/about'}],
  isFullView: false
};

function Wrapper(props){
    const { theme } = useTheme();
    useFonts()

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <Router>
                <Navigation {...props}/>
            </Router>
        </ThemeProvider>
    )
}