import React, { useState, forwardRef, useRef, useCallback, useEffect } from 'react';
import { GoogleMap, Polygon } from '@react-google-maps/api';
import styled from 'styled-components';
import useScrollTrigger from '../../../../hooks/useScrollTrigger';
import { useSpring, animated} from 'react-spring';


import mapStyle from '../../../../theme/mapStyle';
import data from '../../LocalAdaptationArticle/data/pinucont'

const MapDiv = styled(animated.div)`
    width: 100vw;
    height: 100vh;
    position: sticky;
    top: 0px;
`;

const GMap = forwardRef((props, ref) => {
    const { mapRefs, panRefs } = props;
    
    const [ center, setCenter ] = useState({
        lng: -95,
        lat: 53
    });
    const [ toggle ] = useScrollTrigger(mapRefs.mapRef, mapRefs.mapTrigger)
    const [ toggle2 ] = useScrollTrigger(panRefs.ref, panRefs.trigger)
    const springProps = useSpring({opacity: toggle ? 1: 0})
    const mapContainerStyles = {
        width: '100%',
        height: '100%',
    };
    // const gmapRef = useRef(null)
    const onMapLoad = useCallback((map) => {
        panRefs.ref.current = map;
    }, [] )
    const panTo = useCallback(({ lat, lng }) => {
        panRefs.ref.current.panTo({ lat, lng })
        panRefs.ref.current.setZoom(6)

    }, [])

    useEffect(() => {
        if(toggle2) {
            panTo({lat: 55, lng: -120})
        }
    }, [toggle2]) 

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

    return (
        <MapDiv ref={ref} style={springProps}>
            <GoogleMap onLoad={onMapLoad} onClick={() => panTo({lat: 55, lng: -120})} 
                ref={panRefs.ref} mapContainerStyle={mapContainerStyles}
                zoom={4}
                center={center}
                options={options}
            >
                { polygons }

            </GoogleMap>
        </MapDiv>
    )
})

export default GMap;