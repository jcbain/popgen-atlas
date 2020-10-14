import React, { useState } from 'react';
import {
    GoogleMap,
    useLoadScript,
    Polygon
} from '@react-google-maps/api';

import mapStyle from '../../theme/mapStyle'

const Map = (props) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })
    const [ zoom, setZoom ] = useState(5)

    const mapContainerStyles = {
        width: '50vw',
        height: '50vh'
    }
    
    const center = {
        lng: -125,
        lat: 53
    }

    const options = {
        styles: mapStyle,
        disableDefaultUI: true
    }

  
    if (!isLoaded) return "Loading"
    return (
        <>
            <GoogleMap mapContainerStyle={mapContainerStyles} 
                zoom={zoom}
                center={center}
                options={options} />
            <button onClick={() => setZoom(prev => prev + 1)}>Zoom In</button>
            <button onClick={() => setZoom(prev => prev - 1)}>Zoom In</button>

        </>
        
    )
}

export default Map;