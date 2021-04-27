import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from '../dashboards/Dashboard'
import NewNav from './NewNav';


const links = [ 
    {name: 'articles', path: '/articles' }, 
    {name: 'dashboards', path: '/dashboards'},  
    {name: 'about', path: '/about'}
]
const PageRouter = ({theme}) => {

    const [ isSideNav, setIsSideNav ] = useState(true)


    return (
        <Router>
            <NewNav name={"Atlas of Population Genetics"} links={links} isSide={isSideNav}/>
            <Switch>
                <Route path={'/articles'}>
                    <div>hello</div>
                </Route>
                <Route path={'/dashboards'}>
                    <Dashboard theme={theme}/>
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