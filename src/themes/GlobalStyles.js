import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
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