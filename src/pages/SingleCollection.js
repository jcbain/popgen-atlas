import React from 'react';

import collectionsList from './collectionsList';

function SingleCollection({match}){
    const collection = collectionsList.find(({id}) => id === match.params.collectionId);

    return(
        <div className="collection-item">
            <collection.component />
        </div>
    )
}

export default SingleCollection;