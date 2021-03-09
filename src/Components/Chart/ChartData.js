import React, { useEffect, useState } from 'react';
import Parameters from '../ParamDropDown/Parameters';
import LineChart from './LineChartParent';
import FetchData from '../Data/FetchData';
import GenomeArch from './GenomeArchParent';
import DisplayView from './GenomeArchChild';
import LineView from './LineChartChild';
import HistoSlider from './HistoSlider';
import * as d3 from 'd3'
import Histogram from './Histogram';
import styled from 'styled-components';

const ChartDiv = styled.div`
    height: 100%;
    width: 100%;
    background-color:  rgb(214, 220, 224);
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 
       1fr  1fr  1fr;
    grid-template-areas:
      "1    2   param"
      "3    4   param";
`
const Parameter = styled.div`
    grid-area: param;
`

export default function ChartData() {
    const[data, setData] = useState ([]) // Complete gene data stored in indexedDB
    const[uniqueX, setUniqueX] = useState ([]) // List of unique X

    // Updated when user selects a value in parameter select
    const[param, setParam] = useState({ 
        m: 0.001,
        mu: 0.000001,
        r: 0.000001,
        sigSqr: 25
    })

    useEffect(() => { //Fetch data stored in indexedDB
        FetchData().then(result => (
            setData(result.geneData),
            setUniqueX(result.uX)
        ))
    }, [])

    return (
        <ChartDiv>
            <Parameter>
                <Parameters onChange={filtered => setParam(filtered)} param={param}/>
            </Parameter>
            
                <LineChart filteredData={lineChartData(data, uniqueX, param)}>
                    {selection => <LineView filteredData={lineChartData(data, uniqueX, param)} selection={selection}/>}
                </LineChart>

                <GenomeArch filteredData={filterParams(data, param)}>
                    {selection => <DisplayView filteredData={filterParams(data, param)} selection={selection}/>}
                </GenomeArch>

                <HistoSlider>
                    {selection => <Histogram filteredData={histogramData(data, param, selection)}/>}
                </HistoSlider>

                <HistoSlider>
                    {selection => <Histogram filteredData={histogramData(data, param, selection)}/>}
                </HistoSlider>
        </ChartDiv>
    )
}

function filterParams(data, param) {
    return data.filter(gene =>
        ((gene.m == param.m || param.m == "") &&
        (gene.mu == param.mu || param.mu == "") &&
        (gene.r == param.r || param.r == "") &&
        (gene.sigsqr == param.sigSqr || param.sigSqr == ""))
    );
}

function lineChartData(data, uniqueX, param) {
    const points = []
    const filt = filterParams(data, param)

    uniqueX.forEach((elem) => { // Loop through list of unique X coords
        const arr = filt.filter(e => (e.x == elem)) // Filter gene data by X coords

        if (arr.length > 0) { // Avoid error
            const average = d3.mean(arr, d => d.freq);  
            points.push({ // Create points to be plotted on line graph
                x: elem,
                y: average
            })
        }
    })
    return points;
}

function histogramData(data, param, selection) {
    const points  = [];
    const filter = filterParams(data, param)
    const generation = filter.filter(d => d.x == selection);
    const histo = d3.bin()
                    .value(d => d.esf);
  
    histo(generation).forEach((bin) => {
        points.push({
            x: bin.x0,
            y: bin.length
        });
    });
  
    return points;
}