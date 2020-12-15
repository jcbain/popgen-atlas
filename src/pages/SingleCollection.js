import React from 'react';
import LocalAdaptation from './collections/LocalAdaptation';
import Map from './collections/Map'
import { useParams } from "react-router-dom";

import collectionsList from './collectionsList';

function SingleCollection({match}){
    // const collection = collectionsList.find(({id}) => id === match.params.collectionId);
    const {collectionId} = useParams();
    console.log("I hav ebeen called")

    let element = <div></div>
    switch(collectionId){
        case('local-adaptation'):
            element = <LocalAdaptation />
            break;
        case('google-map'):
            element = <Map />
            break;

    }

    return(
        <div className="collection-item">
           {element}
        </div>
    )
}

export default SingleCollection;