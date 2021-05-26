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
    const [zoom, setZoom] = useState(11);
    const [active, setActive] = useState(false)

    useEffect(() => {
        // if (map.current) return; // initialize map only once
         const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/outdoors-v11',
            center: [lng, lat],
            zoom: zoom,
            interactive: false,
            pitch: 60, // pitch in degrees
            bearing: -60, // bearing in degrees
        });

        map.on('load', () => {
            map.addLayer({
                "id": "countour-labels",
                "type": "symbol",
                "source": {
                  type: 'vector',
                  url: 'mapbox://mapbox.mapbox-terrain-v2'
                },
                "source-layer": "contour",
                'layout': {
                  'visibility': 'visible',
                  'symbol-placement': 'line',
                  'text-field': ['concat', ['to-string', ['get', 'ele']], 'm']
                },
                'paint': {
                  'icon-color': '#877b59',
                  'icon-halo-width': 1,
                  'text-color': '#877b59',
                  'text-halo-width': 1
                }
              })

            //   map.addLayer({
            //     "id": "countours",
            //     "type": "line",
            //     "source": {
            //       type: 'vector',
            //       url: 'mapbox://mapbox.mapbox-terrain-v2'
            //     },
            //     "source-layer": "contour",
            //     'layout': {
            //       'visibility': 'visible',
            //       'line-join': 'round',
            //       'line-cap': 'round'
            //     },
            //     'paint': {
            //       'line-color': '#877b59',
            //       'line-width': 1
            //     }
            //   })

            setMap(map);
        })

        return () => map.remove();

    }, [])

    useEffect(() => {
        move()
    }, [active])

    const move = () => {
        if(map && active){
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
                'sky-atmosphere-sun-intensity': 15
                }
                });
            // map.setPitchBearing(70, -70)
            
            // map.addSource('mapbox-dem', {
            //     'type': 'raster-dem',
            //     'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            //     'tileSize': 512,
            //     'maxzoom': 14
            // });
            // console.log(map)
            // map.addLayer({
            //     "id": "countours",
            //     "type": "line",
            //     "source": {
            //       type: 'vector',
            //       url: 'mapbox://mapbox.mapbox-terrain-v2'
            //     },
            //     "source-layer": "contour",
            //     'layout': {
            //       'visibility': 'visible',
            //       'line-join': 'round',
            //       'line-cap': 'round'
            //     },
            //     'paint': {
            //       'line-color': '#877b59',
            //       'line-width': 1
            //     }
            //   })
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