import React from 'react';
import { Route, NavLink, Switch } from "react-router-dom";
import routes from './routes'

const routeComponents = routes.map(({path, component, refresh}, key) => <Route exact path={path} refresh={refresh} component={component} key={key} />);

function App() {
  return (
    <div className="content">
      <header className="App-header">
          <h1>Atlas of Population Genetics</h1>
          <div className="nav-links">
            <p><NavLink to="/">Home</NavLink></p>
            <p><NavLink to="/about">About</NavLink></p>
            <p><NavLink to="/resources">Resources</NavLink></p>
            <p><NavLink to="/collections">Collection</NavLink></p>
          </div>
      </header>
      <Switch>
        {routeComponents}
      </Switch>
    </div>
  );
}

export default App;
