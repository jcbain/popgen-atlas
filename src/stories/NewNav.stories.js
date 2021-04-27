import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import useTheme from '../hooks/useTheme';
import useFonts from '../hooks/useFonts';
import GlobalStyle from '../themes/GlobalStyles'
import NewNav from '../components/pageComponents/NewNav'


export default {
  title: 'PageComponents/NewNavigation',
  component: Wrapper,
};

const Template = (args) => <Wrapper {...args} />;

export const Full = Template.bind({});
Full.args = {
  name: "Atlas of Population Genetics",
  links: [ {name: 'articles', link: '/articles' }, {name: 'dashboards', link: '/dashboards'},  {name: 'about', link: '/about'}],
  isSide: false
};

export const Side = Template.bind({});
Side.args = {
  name: "Atlas of Population Genetics",
  links: [ {name: 'articles', link: '/articles' }, {name: 'dashboards', link: '/dashboards'}, {name: 'about', link: '/about'}],
  isSide: true
};

function Wrapper(props){
    const { theme } = useTheme();
    useFonts()

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <Router>
                <NewNav {...props}/>
            </Router>
        </ThemeProvider>
    )
}