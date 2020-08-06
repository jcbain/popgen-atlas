import React from 'react';

import GenomeArchitecture from './GenomeArchitecture';
import { ChartDiv } from '../ChartStyles';

const GenomeArchGroup = (props) => {
    const { data, xVar, yVar, colorVar,
            displayDims, chartPadding, heightScaler,
            className, useLocalParams, gradients, genKeys } = props;

    const { dimsMain, dimsContextChart, dimsFocusChart } = displayDims;
    const { gradientsFocus, gradientsContext } = gradients;
    const paramOptionsHeight = dimsMain.height * 2/20;


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
                genKey={genKeys.genKeyFocus} />
            <GenomeArchitecture data={data}
                yVar={yVar}
                xVar={xVar}
                colorVar={colorVar}
                displayDims={dimsContextChart} 
                gradients={gradientsContext}
                chartPadding={chartPadding} 
                heightScaler={heightScaler}
                genKey={genKeys.genKeyContext} />

        </ChartDiv>

    )
}

GenomeArchGroup.defaultProps = {
    className: 'genome-chart-group-brush',
    useLocalParams: false,
    displayDims: {width: 50, height: 50}
}

export default GenomeArchGroup