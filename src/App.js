
import Dashboard from './components/dashboards/Dashboard'
import { ThemeProvider } from 'styled-components';

import useTheme from './hooks/useTheme'
import useFonts from './hooks/useFonts'

function App() {
  useFonts()
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>

      <div className="App">
        <Dashboard theme={theme}/>

      </div>
    </ThemeProvider>
  );
}

export default App;
