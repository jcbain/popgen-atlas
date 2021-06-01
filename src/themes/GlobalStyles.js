import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  html, body {
      margin: 0;
      padding: 0;
      border: 0;
      outline: 0;
      overflow: visible;
} 

  .no-decoration {
    text-decoration: none;
  }

  .hidden {
      display: none;
  }

  .show {
      display: block;
  }
`;
 
export default GlobalStyle;