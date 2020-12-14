import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import collectionsList from './collectionsList';
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

function Collections({match}){
    const collectionCards = collectionsList.map(({id, title, description}) => (
        // <Card key={id} title={title} description={description} match={match}/>
        <div className="collection-card" key={id}>
            <Link to={`${match.url}/${id}`}>{title}</Link>
        </div>
    ))

    return(
        <Section className='collection'>
            <h1>Collections</h1>
            <CollectionCards>
                {collectionCards}
            </CollectionCards>
            
        </Section>
    )
}

export default Collections;