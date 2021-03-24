import React from 'react';
import styled from 'styled-components';

import Histogram from './Histogram';
import Slider from './Slider';

const Charts = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: 300px 75px;
    row-gap: 10px;
`

const HistogramGroup = ({data, variable, uniqVals, setGeneration}) =>{

    return (
        <Charts>
            <Histogram data={data} variable={variable} />
            <Slider data={uniqVals} setValue={setGeneration}/>

        </Charts>
    )
}

export default HistogramGroup;