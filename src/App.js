import Nav from './Components/navbar/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Resources from './pages/Resources'
import Collections from './pages/Collections'
import MainDashboard from './Components/dashboard/MainDashboard';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Nav/>
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
