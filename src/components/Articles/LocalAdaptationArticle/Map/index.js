import React, { useEffect, useState, forwardRef } from 'react';
import styled from 'styled-components';
import { geoAlbers, geoPath } from 'd3-geo';
import { useSpring, animated, to } from 'react-spring'
import useScrollTrigger from '../../../../hooks/useScrollTrigger'

import MapShapes from './MapShapes';

import pinusRange from '../data/pinucont';
import namerica from '../data/namerica'

const MapDiv = styled.div`
    width: 100vw;
    height: 100vh;
    position: sticky;
    top: 0;
`

const Map = forwardRef((props, ref) => {
    const { refDict, trigger } = props;
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

    const [ focalLong, focalLat ] = projection([-123, 49]),
          longDelta = focalLong - ( height / 2 ),
          latDelta = focalLat - ( width / 2 );
    
    const [ toggle ] = useScrollTrigger(ref, trigger)

    const { long, lat, s } = useSpring({long: toggle ? longDelta : 0, lat: toggle ? latDelta : 0, s: toggle ? 5 : 1})

    return(
        <MapDiv>
            <animated.svg ref={ref} viewBox={to([lat, long], (lat, long) => `${long} ${lat} 500 500`)} width={'100%'} height={"100%"} style={
                {
                    transform: to([long, lat, s], (long, lat, s) => `scale(${s})`)
                }}>
                <MapShapes ref={refDict['ref']} trigger={refDict['trigger']} displayMarkers={true} data={namerica.features} path={path} fill={'#cae0cb'}/>
                <MapShapes data={pinusRange.features} path={path} fill={'#32a852'}/>
            </animated.svg>

        </MapDiv>

    ) 

})

export default Map;