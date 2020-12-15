import React from 'react';
import { Helmet } from "react-helmet";
import styled, { ThemeProvider } from 'styled-components';

import { GlobalStyle, topTheme } from './theme/globalStyle';
import Navigation from './components/AppComponents/Navigation';

const Main = styled.main`
  width: 100%;
  font-family: ${({ theme }) => theme.fontMain};
`

function App() {
  return (
    <ThemeProvider theme={topTheme}>
      <GlobalStyle />
      <Navigation />
      <Main className="content">
        <Helmet>
            <meta charSet="utf-8" />
            <title>PopGen Atlas</title>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />
        </Helmet>
      </Main>
    </ThemeProvider>
  );
}

export default App;
