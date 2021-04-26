
import Dashboard from './components/dashboards/Dashboard'
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
        <PageRouter />

      </div>
    </ThemeProvider>
  );
}

export default App;
