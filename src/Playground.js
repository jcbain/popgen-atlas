import React from 'react';

import { ParamSelector } from './components/ParamSelector/ParamSelector';
import {ThemeProvider} from 'styled-components';

const theme = {
    color: {
      main: '#fff',
      secondary: '#6fa1c7',
      grayMain: '#6e6e6e',
      graySecondary: '#efefef'
    }
  }

export const PlayGround = (props) => {
    const options = [
        {label: 'Jennifer', value: 1},
        {label: 'James', value: 2},
        {label: 'Chewey', value: 3}

    ]
    return (
        <div>
            <ThemeProvider theme={theme}>
                <ParamSelector 
                    className={'sample-class'}
                    paramName={'Sample Name'} 
                    options={options}
                    viewwidth={16}
                    viewheight={7}>
                </ParamSelector>
            </ThemeProvider>
        </div>
    )
}