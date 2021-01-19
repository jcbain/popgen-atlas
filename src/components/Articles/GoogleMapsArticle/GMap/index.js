import React, { useState, forwardRef, useRef, useCallback, useEffect } from 'react';
import { GoogleMap, Polygon } from '@react-google-maps/api';
import styled from 'styled-components';
import useScrollTrigger from '../../../../hooks/useScrollTrigger';
import useScrollFunction from '../../../../hooks/useScrollFunction'
import { useSpring, animated} from 'react-spring';


import mapStyle from '../../../../theme/mapStyle';
import DistributionLayer from './DistributionLayer';




const MapDiv = styled.div`
    width: 100vw;
    height: 100vh;
    /* position: sticky; */
    top: 0px;
`;



const GMap = forwardRef((props, ref) => {
    const { panRefs, refs } = props;


    
    const mapContainerStyles = {
        width: '100%',
        height: '100%',
    };

    const onMapLoad = useCallback((map) => {
        refs.main.current = map;
    }, [] )

    const pan = useCallback(({ lat, lng, zoom }) => {
        refs.main.current.panTo({ lat, lng })
        refs.main.current.setZoom(zoom)
    }, [])

    const _ = useScrollFunction(
        refs.main, 
        refs.trigger, 
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
        <MapDiv ref={ref}>
            <GoogleMap onLoad={onMapLoad}  
                ref={refs.main} mapContainerStyle={mapContainerStyles}
                zoom={4}
                center={{lat: 53, lng: -95}}
                options={options}
            >   
                <DistributionLayer />
                {/* { toggle3 && <DistributionLayer /> } */}
            </GoogleMap>
        </MapDiv>
    )
})

export default GMap;