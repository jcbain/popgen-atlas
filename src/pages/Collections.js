import React from 'react';
import { Link } from 'react-router-dom';

import collectionsList from './collectionsList';

function Collections({match}){
    const collectionCards = collectionsList.map(({id, title}) => (
        <div className="collection-card" key={id}>
            <Link to={`${match.url}/${id}`}>{title}</Link>
        </div>
    ))

    return(
        <div>
            <h1>Collections</h1>
            {collectionCards}
        </div>
    )
}

export default Collections;