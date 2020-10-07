import React from 'react';
import styled from 'styled-components';
import { geoAlbers, geoPath } from 'd3-geo';

import MapShapes from './MapShapes';

import pinusRange from '../data/pinucont';
import namerica from '../data/namerica'


const MapDiv = styled.div`
    width: 100vw;
    height: 100vh;
    position: sticky;
    top: 0;
`




const Map = (props) => {
    const width = 500, 
          height = 500;
    const scale = 1.75;
    const centerLat = 53,
          centerLong = 100;
    const projection = geoAlbers().scale([ width * scale ])
        .rotate([centerLong, 0])
        .center([0, centerLat])
        .translate([width/2, height/2]);
    const path = geoPath().projection(projection);

    return(
        <MapDiv>
            <svg viewBox={[0, 0, width, height]} width={'100%'} height={"100%"}>
                <MapShapes data={namerica.features} path={path} fill={'#cae0cb'}/>
                <MapShapes data={pinusRange.features} path={path} fill={'#32a852'}/>
            </svg>

        </MapDiv>

    ) 

}

export default Map;