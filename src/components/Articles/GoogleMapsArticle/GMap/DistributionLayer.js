import React from 'react';
import { Polygon } from '@react-google-maps/api';

import data from '../../LocalAdaptationArticle/data/pinucont';


const DistributionLayer = (props) => {

    const polys = [];
    data.features.forEach(( f, i ) => {
        const shape = f.geometry.coordinates[0].map( s => {
            return { lng: s[0], lat: s[1] };
        })
        polys.push(shape);
    })

    const options = {
        fillColor: "#035715",
        fillOpacity: 0.5,
        strokeWeight: 0,
        clickable: false,
        draggable: false,
        editable: false,
        geodesic: false,
        zIndex: 1
    }

    return <Polygon paths={polys} options={options}/>
}

export default DistributionLayer;