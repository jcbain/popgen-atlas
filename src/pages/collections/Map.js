import React, { useState } from 'react';
import {
    GoogleMap,
    useLoadScript,
    Polygon,
    StreetViewPanorama
} from '@react-google-maps/api';

// https://www.youtube.com/watch?v=WZcxJGmLbSo

import mapStyle from '../../theme/mapStyle'

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
                options={options} />
            <button onClick={() => setZoom(prev => prev + 1)}>Zoom In</button>
            <button onClick={() => setZoom(prev => prev - 1)}>Zoom Out</button>
            <button onClick={moveCenter}>Move Center</button>
        </>
        
    )
}

export default Map;