import React, { Component } from 'react';
import ParameterSet from './ParameterSet';

class ParameterCollection extends Component{
    render(){
        return(
            <div>
                <ParameterSet 
                    label={'Sample'}
                    options={[1,2,3,4]}
                    minWidth={120}
                >
                </ParameterSet>
            </div>
        )
    }
}

export default ParameterCollection;