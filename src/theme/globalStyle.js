import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    @import url(‘https://fonts.googleapis.com/css?family=Montserrat|Roboto');

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
        background-color: #ffffff;
      }
      
      .main-wrapper {
        width: 100vw;
        display: flex;
        flex-direction: column;
      }
      
      header {
        width: 100vw;
        display: grid;
        grid-template-rows: 1fr 1fr;
        justify-content: center;
        text-align: center;
      }
      
      .nav-links {
        display: flex;
        justify-content: space-around;
      }
      

`;

