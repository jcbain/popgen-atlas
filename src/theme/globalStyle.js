import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  #root {
      margin: 0;
      padding: 0
  }

  body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
      color: ${({theme}) => theme.textColor};
  }

  html, body {
      margin: 0;
      padding: 0;
      background-color: ${({theme}) => theme.mainColor };
    }
        
`;

export const topTheme = {
  mainColor: '#ffffff',
  textColor: '#303030',
  fontFlashy: "'Playfair Display', serif",
  mainPaddingX: '5vw',
}

GlobalStyle.defaultProps = {
    theme: topTheme
}



