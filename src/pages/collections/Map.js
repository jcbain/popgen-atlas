import React, { useState } from 'react';
import {
    GoogleMap,
    useLoadScript,
    Polygon,
    StreetViewPanorama
} from '@react-google-maps/api';

// https://www.youtube.com/watch?v=WZcxJGmLbSo

import mapStyle from '../../theme/mapStyle'
import data from './data/pinucont'

console.log(data.features[0].geometry.coordinates[0].map( d => {
    return { lat: d[1], lng: d[0] }
}))

const Map = (props) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })
    const [ zoom, setZoom ] = useState(5)
    const [ center, setCenter ] = useState({
        lng: -125,
        lat: 53
    })

    const mapContainerStyles = {
        width: '80vw',
        height: '80vh'
    }
    
    const options = {
        styles: mapStyle,
        disableDefaultUI: true,
        mapTypeId: 'terrain'
    }

    const shape = data.features[0].geometry.coordinates[0].map( d => {
        return { lat: d[1], lng: d[0] }
    })


    const shapeOptions = {
        fillColor: "lightblue",
        fillOpacity: 0.5,
        // strokeColor: "none",
        strokeOpacity: 1,
        strokeWeight: 0,
        clickable: false,
        draggable: false,
        editable: false,
        geodesic: false,
        zIndex: 1
    }


    const polygons = data.features.map( (f, i) => {
        const shape = f.geometry.coordinates[0].map(s => {
            return { lng: s[0], lat: s[1]}
        })

        return (
            <Polygon key={i}
                path={shape}
                options={shapeOptions}
            />
        )
    })


    const moveCenter = () => {
        setCenter(prev => ({
            ...prev, lng: prev.lng - 1, lat: prev.lat -1
        }))
    }

  
    if (!isLoaded) return "Loading"
    return (
        <>
            <GoogleMap mapContainerStyle={mapContainerStyles} 
                zoom={zoom}
                center={center}
                options={options}>
                    { polygons }
                        {/* <Polygon
                        paths={shape}
                        options={shapeOptions}
                        /> */}
                </GoogleMap>
            <button onClick={() => setZoom(prev => prev + 1)}>Zoom In</button>
            <button onClick={() => setZoom(prev => prev - 1)}>Zoom Out</button>
            <button onClick={moveCenter}>Move Center</button>
        </>
        
    )
}

export default Map;