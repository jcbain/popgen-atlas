import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';

import distribution from './data/pinucont.json'

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
    const [focusMap, setFocusMap] = useState(false)
    const [addLayer, setAddLayer] = useState(false)

    const coords = {lng: -115.42, lat: 51.07}
    const positions = [
        {zoom: 2.5, pitch: 0, bearing: 0},
        {zoom: 13, pitch: 80, bearing: 93}
    ]

    useEffect(() => {
        // if (map.current) return; // initialize map only once
         const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y',
            center: [coords.lng, coords.lat],
            zoom: positions[0].zoom,
            interactive: false,
            pitch: positions[0].pitch, // pitch in degrees
            bearing: positions[0].bearing, // bearing in degrees
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

            map.addSource('lodgepole-dist', {
                'type': 'geojson',
                'data': distribution
            })

            // map.addLayer({
            //     'id': 'tree-boundary',
            //     'type': 'fill',
            //     'source': 'lodgepole-dist',
            //     'paint': {
            //     'fill-color': 'red',
            //     'fill-opacity': 0.4
            //     },
            //     'filter': ['==', '$type', 'Polygon']
            //     });


            setMap(map);
        })

        return () => map.remove();

    }, [])

    useEffect(() => {
        move()
    }, [focusMap])

    useEffect(() => {
        addDistributionLayer()
    }, [addLayer])

    const move = () => {
        if(map){
            if(focusMap){
                map.flyTo({
                    zoom: positions[1].zoom, 
                    pitch: positions[1].pitch,
                    bearing: -positions[1].bearing
                })
            } else {
                map.flyTo({
                    zoom: positions[0].zoom, 
                    pitch: positions[0].pitch,
                    bearing: -positions[0].bearing
                })
            }

        }
    }

    const addDistributionLayer = () => {
        if(map) {
            map.addLayer({
                'id': 'tree-boundary',
                'type': 'fill',
                'source': 'lodgepole-dist',
                'paint': {
                'fill-color': 'red',
                'fill-opacity': addLayer ? 0.4 : 0
                },
                'filter': ['==', '$type', 'Polygon']
                });
        }
    }
    
    return (
        <Wrapper>
            <DrawingArea>
                <MapDiv ref={mapContainer}/>
            </DrawingArea>
            <ButtonBar>
                <button onClick={() => setAddLayer(prev => !prev)}>add distribution</button>
                <button onClick={() => setFocusMap(prev => !prev)}>move</button>
            </ButtonBar>
        </Wrapper>
    )
}

export default Map;