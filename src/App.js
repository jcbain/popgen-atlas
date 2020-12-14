import React from 'react';
import { Helmet } from "react-helmet";
import styled, { ThemeProvider } from 'styled-components';

import { GlobalStyle, topTheme } from './theme/globalStyle';
import Navigation from './components/AppComponents/Navigation';

function App() {
  return (
    <ThemeProvider theme={topTheme}>
      <GlobalStyle />
      <div className="content">
        <Helmet>
            <meta charSet="utf-8" />
            <title>PopGen Atlas</title>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        </Helmet>
        <Navigation />
      </div>
    </ThemeProvider>
  );
}

export default App;
