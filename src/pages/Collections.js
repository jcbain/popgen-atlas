import React from 'react';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import collectionsList from './collectionsList';
import SingleCollection from './SingleCollection';
import Card from '../components/AppComponents/Card';
import { device } from '../devices';

const Section = styled.section`
    text-align: initial;
`

const CollectionCards = styled.div`
    display: grid;
    grid-template-rows: auto;
    padding: 0 ${({ theme }) => theme.mainPaddingX} 0 ${({ theme }) => theme.mainPaddingX};
    @media ${ device.laptop }{
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`

function Collections(){
    const { path, url } = useRouteMatch();
    const collectionCards = collectionsList.map(({id, title, description}) => (
        <div className="collection-card" key={id}>
            <Link to={`${url}/${id}`}>{title}</Link>
        </div>
    ))


    return(
        <Section className='collection' style={{width: '100%'}}>
            <Switch>
                <Route exact path={path} >
                    <h1>Collections</h1>
                    <CollectionCards>
                        {collectionCards}
                    </CollectionCards>
                </Route>
                <Route path={`${path}/:collectionId`}>
                    <SingleCollection />
                </Route>
            </Switch>
            
        </Section>
    )
}

export default Collections;