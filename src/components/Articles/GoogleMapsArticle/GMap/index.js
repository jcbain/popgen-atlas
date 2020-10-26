import React, { useState, forwardRef, useRef, useCallback, useEffect } from 'react';
import { GoogleMap, Polygon } from '@react-google-maps/api';
import styled from 'styled-components';
import useScrollTrigger from '../../../../hooks/useScrollTrigger';
import useScrollFunction from '../../../../hooks/useScrollFunction'
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
    
    const [ toggle ] = useScrollTrigger(mapRefs.mapRef, mapRefs.mapTrigger)
    const [ toggle3 ] = useScrollTrigger(panRefs.ref, vizRefs.trigger)
    const springProps = useSpring({opacity: toggle ? 1: 0})
    const mapContainerStyles = {
        width: '100%',
        height: '100%',
    };

    const onMapLoad = useCallback((map) => {
        panRefs.ref.current = map;
    }, [] )

    const pan = useCallback(({ lat, lng, zoom }) => {
        panRefs.ref.current.panTo({ lat, lng })
        panRefs.ref.current.setZoom(zoom)
    }, [])

    const status = useScrollFunction(
        panRefs.ref, 
        panRefs.trigger, 
        () => pan({lat: 55, lng: -120, zoom: 6}),
        () => pan({lat: 53, lng: -95, zoom: 4})
    )


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
                center={{lat: 53, lng: -95}}
                options={options}
            >   
                { toggle3 && <DistributionLayer /> }
            </GoogleMap>
        </MapDiv>
    )
})

export default GMap;