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

const HistogramGroup = ({data, variable, uniqVals, setGroup, theme, sliderLabel}) =>{

    return (
        <Charts>
            <Histogram data={data} variable={variable} theme={theme} />
            <Slider data={uniqVals} setValue={setGroup} label={sliderLabel}/>

        </Charts>
    )
}

export default HistogramGroup;