import React from 'react';

const MapShapes = (props) => {
    const { data, path } = props;
    
    const shapes = data.map((d, i) => {
        return (
            <path key={i}
                d={path(d)}
                // stroke={'green'}
                fill={props.fill}
            />
        )
    })

    return shapes
}

export default MapShapes;