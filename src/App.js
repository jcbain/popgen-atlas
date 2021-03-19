import Nav from './components/navbar/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Resources from './pages/Resources'
import Collections from './pages/Collections'
import MainDashboard from './components/dashboard/MainDashboard';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import useDexieDb from './hooks/useDexieDb'

function App() {

  const {data, queryPop} = useDexieDb();
  console.log(data)
  return (
    <Router>
      <div>
        <Nav/>
        <button onClick={() => queryPop(1)}>click me</button>
        <button onClick={() => queryPop(2)}>click me</button>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/resources" component={Resources}/>
            <Route exact path="/collections" component={Collections}>
              <MainDashboard/>
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
