import React from 'react';
import {ParamContainer, ParamDescription} from './DashboardComponentCardsStyles';

export const ParamCard = (props) => {
    const {children, description, viewwidth, display} = props;

    return (
        <ParamContainer display={display} viewwidth={viewwidth}>
            <ParamDescription>{description.toUpperCase()}</ParamDescription>
            {children}
        </ParamContainer>
    )
}