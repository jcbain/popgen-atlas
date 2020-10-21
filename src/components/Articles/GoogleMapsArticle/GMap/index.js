import React, { useState } from 'react';
import { GoogleMap, Polygon } from '@react-google-maps/api';
import styled from 'styled-components';

import mapStyle from '../../../../theme/mapStyle';
import data from '../../LocalAdaptationArticle/data/pinucont'

const MapDiv = styled.div`
    width: 100vw;
    height: 100vh;
    position: sticky;
    top: 0px;
`;

const GMap = (props) => {

    const [ zoom, setZoom ] = useState(4);
    const [ center, setCenter ] = useState({
        lng: -95,
        lat: 53
    });

    const mapContainerStyles = {
        width: '100%',
        height: '100%',
    };

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
        <MapDiv>
            <GoogleMap mapContainerStyle={mapContainerStyles}
                zoom={zoom}
                center={center}
                options={options}
            >
                { polygons }

            </GoogleMap>
        </MapDiv>
    )
}

export default GMap;