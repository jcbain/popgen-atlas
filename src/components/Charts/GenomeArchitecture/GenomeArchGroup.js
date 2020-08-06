import React, { useState } from 'react';
import { min, max } from 'd3-array';

import GenomeArchitecture from './GenomeArchitecture';
import { ChartDiv } from '../ChartStyles';

const GenomeArchGroup = (props) => {
    const { data, xVar, yVar, colorVar,
            displayDims, chartPadding, heightScaler,
            className, useLocalParams, gradients, genKeys } = props;

    const minX = min(data, d => d[xVar]),
          maxX = max(data, d => d[xVar]);
    
    const [contextDomain, setContextDomain] = useState([minX, maxX]);

    const { dimsMain, dimsContextChart, dimsFocusChart } = displayDims;
    const { gradientsFocus, gradientsContext } = gradients;
    const paramOptionsHeight = dimsMain.height * 2/20;

    const getDomain = (domain) => {
        setContextDomain(domain)
    }


    return (
        <ChartDiv className={className}
            displaywidth={displayDims.width}
            displayheight={displayDims.height}>
            <GenomeArchitecture data={data}
                yVar={yVar}
                xVar={xVar}
                colorVar={colorVar}
                displayDims={dimsFocusChart} 
                gradients={gradientsFocus}
                chartPadding={chartPadding} 
                heightScaler={heightScaler}
                genKey={genKeys.genKeyFocus} 
                addBrush={false}
                contextDomain={[minX, maxX]}
                xDomain={contextDomain}
                />
            <GenomeArchitecture data={data}
                yVar={yVar}
                xVar={xVar}
                colorVar={colorVar}
                displayDims={dimsContextChart} 
                gradients={gradientsContext}
                chartPadding={chartPadding} 
                heightScaler={heightScaler}
                genKey={genKeys.genKeyContext}
                addBrush={true}
                contextDomain={contextDomain}
                xDomain={[minX, maxX]}
                getDomain={getDomain}/>

        </ChartDiv>

    )
}

GenomeArchGroup.defaultProps = {
    className: 'genome-chart-group-brush',
    useLocalParams: false,
    displayDims: {width: 50, height: 50}
}

export default GenomeArchGroup