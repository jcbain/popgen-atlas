import React, { useState, forwardRef, useRef, useCallback, useEffect } from 'react';
import { GoogleMap, Polygon } from '@react-google-maps/api';
import styled from 'styled-components';
import useScrollTrigger from '../../../../hooks/useScrollTrigger';
import { useSpring, animated} from 'react-spring';


import mapStyle from '../../../../theme/mapStyle';
import DistributionLayer from './DistributionLayer';


const MapDiv = styled(animated.div)`
    width: 100vw;
    height: 100vh;
    position: sticky;
    top: 0px;
`;

const GMap = forwardRef((props, ref) => {
    const { mapRefs, panRefs, vizRefs } = props;
    
    const [ center, setCenter ] = useState({
        lng: -95,
        lat: 53
    });
    const [ toggle ] = useScrollTrigger(mapRefs.mapRef, mapRefs.mapTrigger)
    const [ toggle2 ] = useScrollTrigger(panRefs.ref, panRefs.trigger)
    const [ toggle3 ] = useScrollTrigger(panRefs.ref, vizRefs.trigger)
    const springProps = useSpring({opacity: toggle ? 1: 0})
    const mapContainerStyles = {
        width: '100%',
        height: '100%',
    };

    const onMapLoad = useCallback((map) => {
        panRefs.ref.current = map;
    }, [] )

    const pan = useCallback(({ lat, lng }) => {
        panRefs.ref.current.panTo({ lat, lng })
        panRefs.ref.current.setZoom(6)
    }, [])
    

    useEffect(() => {
        if(toggle2) {
            pan({lat: 55, lng: -120}) 
        } 
        
    }, [toggle2]) 

    const options = {
        styles: mapStyle,
        disableDefaultUI: true,
        mapTypeId: 'terrain',
        draggable: false,
        editable: false
    }


    return (
        <MapDiv ref={ref} style={springProps}>
            <GoogleMap onLoad={onMapLoad}  
                ref={panRefs.ref} mapContainerStyle={mapContainerStyles}
                zoom={4}
                center={center}
                options={options}
            >   
                { toggle3 && <DistributionLayer /> }
            </GoogleMap>
        </MapDiv>
    )
})

export default GMap;