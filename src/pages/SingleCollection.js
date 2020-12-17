import React from 'react';
import LocalAdaptation from './collections/LocalAdaptation';
import Map from './collections/Map'
import { useParams } from "react-router-dom";


function SingleCollection(){
    const {collectionId} = useParams();

    let element = <div></div>
    switch(collectionId){
        case('local-adaptation'):
            element = <LocalAdaptation />
            break;
        case('google-map'):
            element = <Map />
            break;
        default:
            element = <div></div>

    }

    return(
        <div className="collection-item">
           {element}
        </div>
    )
}

export default SingleCollection;