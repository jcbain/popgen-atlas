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
    const [map, setMap] = useState(null)
    const [lng, setLng] = useState(-115.9);
    const [lat, setLat] = useState(51.35);
    const [zoom, setZoom] = useState(8);
    const [active, setActive] = useState(false)

    useEffect(() => {
        // if (map.current) return; // initialize map only once
         const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y',
            center: [lng, lat],
            zoom: zoom,
            interactive: false,
            pitch: 15, // pitch in degrees
            bearing: -90, // bearing in degrees
        });

        map.on('load', () => {
      
              map.addSource('mapbox-dem', {
                'type': 'raster-dem',
                'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                'tileSize': 512,
                'maxzoom': 14
                });
                // add the DEM source as a terrain layer with exaggerated height
                map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
                 
                // add a sky layer that will show when the map is highly pitched
                map.addLayer({
                'id': 'sky',
                'type': 'sky',
                'paint': {
                'sky-type': 'atmosphere',
                'sky-atmosphere-sun': [0.0, 0.0],
                'sky-atmosphere-sun-intensity': 12
                }
                });


            setMap(map);
        })

        return () => map.remove();

    }, [])

    useEffect(() => {
        move()
    }, [active])

    const move = () => {
        if(map && active){
            map.flyTo({
                center: [-117, 52], 
                zoom: 11, 
                pitch: 75
            })

        }
    }
    
    return (
        <Wrapper>
            <DrawingArea>
                <MapDiv ref={mapContainer}/>
            </DrawingArea>
            <ButtonBar><button onClick={() => setActive(prev => !prev)}>click me</button></ButtonBar>
        </Wrapper>
    )
}

export default Map;