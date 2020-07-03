import React from 'react';

import { ParamSelector } from './components/ParamSelector/ParamSelector';

export const PlayGround = (props) => {
    const options = [
        {label: 'Jennifer', value: 1},
        {label: 'James', value: 2},
        {label: 'Chewey', value: 3}

    ]
    return (
        <div>
            <ParamSelector 
                className={'sample-class'}
                paramName={'Sample Name'} 
                options={options}
                viewwidth={20}
                viewheight={7}></ParamSelector>

        </div>
    )
}