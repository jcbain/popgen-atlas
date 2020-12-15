import { useEffect, useState } from 'react';
import FetchData from './Components/Data/FetchData';
import ChartData from './Components/Chart/ChartData';
import Nav from './Components/NavBar/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import Resources from './Pages/Resources'
import Collections from './Pages/Collections'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';

function App() {
  const[data, setData] = useState ([]); //All data stored in indexedDB

  useEffect(() => { //Fetch data stored in indexedDB
    FetchData().then(result => setData(result));
  }, [])

  return (
    <Router>
      <div className='App'>
        <Nav/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/resources" component={Resources}/>
            <Route path="/collections" component={Collections}>
              <ChartData chartData={data}/>
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
