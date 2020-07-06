import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


import LineChartGroup from '../../LineChartGroup2';
import { DashboardComponentContainer } from '../DashboardComponentStyles';


const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 1vh;
    right: 1vw;
    z-index: 1000;
`;

export const ChartViewLineChart = (props) => {
    const {lineChartData, viewwidth, viewheight, params, useLocalParams, specialOpts, paramOptions, xAction, handleSwitch} = props;

    return (
        <DashboardComponentContainer viewwidth={viewwidth}
            viewheight={viewheight}>
                <StyledFontAwesomeIcon onClick={xAction} size="xs" pull="right" icon={faTimes} />
                <LineChartGroup data={lineChartData}
                    className={'component-line-chart-group'}
                    params={params}
                    useLocalParams={useLocalParams}
                    specialOpts={specialOpts}
                    displayDims={{width: viewwidth, height: viewheight}}
                    paramOptions={paramOptions}
                    handleSwitch={handleSwitch}
                    >
                </LineChartGroup>

        </DashboardComponentContainer>
    )
}

ChartViewLineChart.defaultProps = {
    xAction: () => console.log("I don't do anything")
}