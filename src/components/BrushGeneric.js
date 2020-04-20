import React, { Component } from 'react';
import { brushX } from 'd3-brush';

function BrushGeneric(props){
    const genericBrush = brushX()
    return <g>{genericBrush}</g>
}


export default BrushGeneric;