import React from 'react';
import { Route, NavLink, Switch } from "react-router-dom";
import routes from './routes'
import {Helmet} from "react-helmet";


const routeComponents = routes.map(({path, component, refresh}, key) => <Route exact path={path} refresh={refresh} component={component} key={key} />);

const linksData = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Resources', path: '/resources' },
  { name: 'Collections', path: '/collections' }
]


function App() {

  const links = linksData.map((l, i) => {
    const { name, path } = l;
    return <p key={i}><NavLink to={path}>{ name }</NavLink></p>
  })

  return (
    <div className="content">
      <Helmet>
          <meta charSet="utf-8" />
          <title>Popgen Atlas</title>
          <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@600&family=Lato:wght@700&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz:wght@500;600&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;600&display=swap" rel="stylesheet" />      
          <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Baloo+Tamma+2:wght@400;500;600&display=swap" rel="stylesheet" /> 
        </Helmet>
      <header className="App-header">
          <h1>Atlas of Population Genetics</h1>
          <div className="nav-links">
            { links }
          </div>
      </header>
      <Switch>
          {routeComponents}
      </Switch>
    </div>
  );
}

export default App;
