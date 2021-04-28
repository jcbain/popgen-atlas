import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, caption {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    /* font-size: 100%; */
    vertical-align: baseline;
    background: transparent;
}
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