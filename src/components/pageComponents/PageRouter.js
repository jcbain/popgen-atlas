import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from './Navigation';

const links = [ 
    {name: 'articles', path: '/articles' }, 
    {name: 'dashboards', path: '/dashboards'},  
    {name: 'about', path: '/about'}
]
const PageRouter = ({}) => {

    const [ navigationIsFull, setNavigationIsFull ] = useState(false)


    return (
        <Router>
            <Navigation links={links} isFullView={navigationIsFull}/>
            <Switch>
                <Route path={'/articles'}>
                    <div>hello</div>
                </Route>
                <Route path={'/dashboards'}>
                    <div>hello again</div>
                </Route>
                <Route path={'/about'}>
                    <div>hello for the last time</div>
                </Route>
                <Route path={'/'}>
                    <div>hello for the last time</div>
                </Route>
            </Switch>
        </Router>
    )
}

export default PageRouter;