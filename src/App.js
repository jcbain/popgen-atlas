
import { ThemeProvider } from 'styled-components';
import PageRouter from './components/pageComponents/PageRouter';

import GlobalStyle from './themes/GlobalStyles'
import useTheme from './hooks/useTheme'
import useFonts from './hooks/useFonts'

function App() {
  useFonts()
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <div className="App">
        {/* <Dashboard theme={theme}/> */}
        <PageRouter theme={theme} />

      </div>
    </ThemeProvider>
  );
}

export default App;
