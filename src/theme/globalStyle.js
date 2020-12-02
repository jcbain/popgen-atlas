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
    }

    html, body {
        margin: 0;
        padding: 0;
        background-color: ${({mainbackground}) => mainbackground };
      }
      
      .main-wrapper {
        width: 100vw;
        display: flex;
        flex-direction: column;
      }
      
      .nav-links {
        display: flex;
        justify-content: space-around;
      }
`;

GlobalStyle.defaultProps = {
    mainbackground: '#fff'
}

