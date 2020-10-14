import React from 'react';
import {
    GoogleMap,
    useLoadScript
} from '@react-google-maps/api';

const Map = (props) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    const mapContainerStyles = {
        width: '100vw',
        height: '100vh'
    }
    
    const center = {
        lng: -125,
        lat: 53
    }

    if (!isLoaded) return "Loading"
    return (
        <GoogleMap mapContainerStyle={mapContainerStyles} 
            zoom={8}
            center={center}/>
    )
}

export default Map;