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
        lng: -95,
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

    const polygonOptions = {
        fillColor: "#035715",
        fillOpacity: 0.5,
        strokeWeight: 0,
        clickable: false,
        draggable: false,
        editable: false,
        geodesic: false,
        zIndex: 1
    }

    const polygons = data.features.map((f, i) => {
        const shape = f.geometry.coordinates[0].map(s => {
            return { lng: s[0], lat: s[1] };
        })

        return (
            <Polygon key={i}
                path={shape}
                options={polygonOptions}
            />
        )
    });

    if (!isLoaded) return "Loading";
    return (
        <>
            <GoogleMap mapContainerStyle={mapContainerStyles}
                zoom={zoom}
                center={center}
                options={options}
            >
                { polygons }

            </GoogleMap>
        </>
    )
}

export default GMap;