import React from 'react';
import styled from 'styled-components';

import { DashboardComponentContainer } from '../DashboardComponentStyles';

const ChartCardsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1vw;
`

const ChartCardContainer = styled.div`
    padding: 1rem;
    text-align: center;
    border: 1px solid ${props => props.theme.color.graySecondary};
    border-radius: 2px;
    box-shadow: 0px 1px 2px 0px rgba(168,168,168,1);
`

const chartData = [
    {chartTitle: 'Line Chart', chartId: 'linechartgroup'},
    {chartTitle: 'Genome Chart', chartId: 'genearchgroup'}
]

const ChartCardView = (props) => {
    const {viewwidth, viewheight, cardAction} = props;

    const chartCards = chartData.map((d, i) => {
        return (
            <ChartCardContainer key={i}
                onClick={() => cardAction(d.chartId)}
            >
                {d.chartTitle}
            </ChartCardContainer>
        )
    })


    return (
        <DashboardComponentContainer viewwidth={viewwidth}
            viewheight={viewheight}>
                <ChartCardsContainer>
                    {chartCards}
                </ChartCardsContainer>
            

        </DashboardComponentContainer>
    )
}

export default ChartCardView;