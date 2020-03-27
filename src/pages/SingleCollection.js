import React from 'react';

import collectionsList from './collectionsList';

function SingleCollection({match}){
    const collection = collectionsList.find(({id}) => id === match.params.collectionId);

    return(
        <div className="collection-item">
            <div className="banner title-banner collection-title-container">
                <h1 className="collection-title">{collection.title.toLocaleUpperCase()}</h1>
            </div>
            <collection.component />
        </div>
    )
}

export default SingleCollection;