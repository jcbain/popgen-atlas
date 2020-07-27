import React from 'react';
import styled from 'styled-components';
import {ThemeProvider} from 'styled-components';

import {ReferenceText, ReferenceRect} from './LineChartStyles';

const StyledLine = styled.line`
    stroke: #919191;
    stroke-width: 2;
    stroke-dasharray: 5;
`

const ReferenceLine = (props) => {
    const {yScale, xPos, yTextPos, showContent, y1, y2,
           x1, x2, themes, yVar} = props;
    const xExtent = (x2 - x1),
          yExtent = (y2 - y1);
    const boxWidth = xExtent / 8,
          boxHeight = yExtent / 8;
    const boxShiftLength = xExtent - boxWidth;
    const texts = yTextPos.map(( d, i ) => {
        const textTheme = themes[d.key]
        return (
            <ThemeProvider key={i} theme={textTheme || themes[0]}>
                <svg x={!isNaN(xPos) ? ((xPos < boxShiftLength) ? xPos + 2 : xPos - boxWidth - 2) : 0} 
                    y={!isNaN(yScale(d[yVar])) ? yScale(d[yVar]) - (boxHeight/2) : 0}
                    width={boxWidth} 
                    height={boxHeight}
                    overflow={'visible'}
                    >
                    <ReferenceRect 
                        rx={'5%'}
                        strokeLinejoin="round"
                        width={boxWidth} 
                        height={boxHeight}
                        opacity={0.8}
                        display={showContent ? 'inline' : 'none'} />
                    <ReferenceText key={i} 
                        x={showContent ? '50%' : '0'}
                        y={showContent ? '50%' : '0'}
                        fontSize={'10px'}
                        alignmentBaseline="middle"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        display={showContent ? 'inline' : 'none'}
                        >
                            {!isNaN(d[yVar]) ? Number(Math.round(d[yVar] +'e3')+'e-3') : ''}
                    </ReferenceText>
                </svg>
            </ThemeProvider>
        )
    })
    return (
        <g>
            <StyledLine display={showContent ? 'inline' : 'none'}
                x1={showContent ? xPos : 0} x2={showContent ? xPos : 0} y1={showContent ? y1 : 0} y2={showContent ? y2 : 0} />
            {texts}
        </g>
    )
}

export default ReferenceLine;