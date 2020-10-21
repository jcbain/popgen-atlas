import React, { useState } from 'react';
import {
    GoogleMap,
    useLoadScript,
    Polygon
} from '@react-google-maps/api';

import mapStyle from '../../../../theme/mapStyle';
import data from '../../LocalAdaptationArticle/data/pinucont'

const GMap = (props) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })
    const [ zoom, setZoom ] = useState(4);
    const [ center, setCenter ] = useState({
        lng: -125,
        lat: 53
    });

    const mapContainerStyles = {
        width: '100vw',
        height: '100vh'
    };

    const options = {
        styles: mapStyle,
        disableDefaultUI: true,
        mapTypeId: 'terrain',
        draggable: false,
        editable: false
    }

    if (!isLoaded) return "Loading";
    return (
        <>
            <GoogleMap mapContainerStyle={mapContainerStyles}
                zoom={zoom}
                center={center}
                options={options}
            >

            </GoogleMap>
        </>
    )
}

export default GMap;