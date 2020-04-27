import React, { Component } from 'react';

import GeneArchitecture from '../charts/GeneArchitecture';

class GeneArchGroup extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <GeneArchitecture key="gene-arch-1" 
                          data={this.props.data}
                          template={this.props.template}
                          params={this.props.params}
                          height={100}
                          width={200}
                          addBrush={false}></GeneArchitecture>
                <GeneArchitecture key="gene-arch-2" 
                          data={this.props.data}
                          template={this.props.template}
                          params={this.props.params}
                          height={100}
                          width={200}
                          addBrush={true}></GeneArchitecture>
            </div>
        )
    }
}

export default GeneArchGroup;