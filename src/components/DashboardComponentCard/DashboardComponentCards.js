import React from 'react';
import {ParamContainer, ParamDescription} from './DashboardComponentCardsStyles';

export const ParamCard = (props) => {
    const {children, description} = props;

    return (
        <ParamContainer>
            <ParamDescription>{description.toUpperCase()}</ParamDescription>
            {children}
        </ParamContainer>
    )
}