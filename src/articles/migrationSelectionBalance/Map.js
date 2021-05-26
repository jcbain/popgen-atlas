import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY


const Wrapper = styled.div`
    width: calc(100% - 40px);
    height: 400px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 80px;
`

const ButtonBar = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
`

const DrawingArea = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: 2px solid; 
`

const MapDiv = styled.div`
    width: 100%;
    height: 100%;
`

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-115.9);
    const [lat, setLat] = useState(51.35);
    const [zoom, setZoom] = useState(15);

    useEffect(() => {
        if (map.current) return; // initialize map only once
            map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/outdoors-v11',
            center: [lng, lat],
            zoom: zoom,
            interactive: false,
            pitch: 60, // pitch in degrees
            bearing: -60, // bearing in degrees
        });

    }, [])
    
    return (
        <Wrapper>
            <DrawingArea>
                <MapDiv ref={mapContainer}/>
            </DrawingArea>
            <ButtonBar></ButtonBar>
        </Wrapper>
    )
}

export default Map;