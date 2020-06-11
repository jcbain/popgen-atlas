import React from 'react';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { min, max, histogram } from 'd3-array';
import {flatten} from 'lodash'
import styled from 'styled-components';


import { unique } from '../helpers/DataHelpers';

const MainSvg= styled.svg`
    width: ${props => props.width}vw;
    height: ${props => props.height}vh;

`

export default function Histogram(props){
    const popSize = 1000 // calculate popsize from data in future
    const xScale = scaleLinear().domain(
        [
            min(props.data, d => d.ind_phen),
            max(props.data, d => d.ind_phen)
        ]
        ).range([0, props.width]);
    const focusColor = scaleOrdinal().domain([0, 1, 2]).range(['#E27D60', '#C38D9E', '#E8A87C']);
    const hist = histogram().value(d => d.ind_phen).domain(xScale.domain()).thresholds(xScale.ticks(30));
    let binGroups = [];
    props.data.map(d => d.pop).filter(unique).map( d => {
        return binGroups.push(hist(props.data.filter(v => v.pop === d)));
    })
    const maxBinNum = max(flatten(binGroups.map(d => d.map(v => v.length))))
    const yScale = scaleLinear()
    .range([props.height, 0])
    .domain([0, maxBinNum])
    const popHistograms = binGroups.map((d, i) => {
        return d.map( (v, j) => {
            return (
                <rect key={`${i}-${j}`}
                    x={1}
                    transform={`translate(${xScale(v.x0)}, ${yScale(v.length)})`}
                    width={xScale(v.x1) - xScale(v.x0) - 1}
                    height={props.height - yScale(v.length)}
                    fill={focusColor(i)}
                    opacity={0.6}
                >

                </rect>
            )
        })

    })


    return (
        <MainSvg width={40} height={50} viewBox={[0, 0, 100, props.width]}>
            {popHistograms}
        </MainSvg>
    )
}