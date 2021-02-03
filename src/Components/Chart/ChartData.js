import React, { useEffect, useState } from 'react';
import Parameters from '../ParamDropDown/Parameters';
import LineChart from './LineChartParent';
import './Chart.css';
import FetchData from '../Data/FetchData';
import GenomeArch from './GenomeArchParent';
import DisplayView from './GenomeArchChild';
import LineView from './LineChartChild';

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
        <div>
            <div className="Main">
                <div className="param-select">
                    <Parameters onChange={filtered => setParam(filtered)} param={param}/>
                </div>
                
                <div>
                    <LineChart filteredData={lineChartData(data, uniqueX, param)}>
                        {selection => <LineView filteredData={lineChartData(data, uniqueX, param)} selection={selection}/>}
                    </LineChart>
                </div>
                <div>
                    <GenomeArch filteredData={filterParams(data, param)}>
                        {selection => <DisplayView filteredData={filterParams(data, param)} selection={selection}/>}
                    </GenomeArch>
                </div>
                <div>
                    <GenomeArch filteredData={filterParams(data, param)}>
                        {selection => <DisplayView filteredData={filterParams(data, param)} selection={selection}/>}
                    </GenomeArch>
                </div>
                <div>
                    <LineChart filteredData={lineChartData(data, uniqueX, param)}>
                        {selection => <LineView filteredData={lineChartData(data, uniqueX, param)} selection={selection}/>}
                    </LineChart>
                </div>
            </div>
        </div>
    )
}

// @TODO: Should be in diff file????
// Returns filtered data to be plotted on chart after user selects parameter
function filterParams(data, param) {
    return data.filter(gene =>
        ((gene.m == param.m || param.m == "") &&
        (gene.mu == param.mu || param.mu == "") &&
        (gene.r == param.r || param.r == "") &&
        (gene.sigsqr == param.sigSqr || param.sigSqr == ""))
    );
}

// Returns data to plot on LineChart
function lineChartData(data, uniqueX, param) {
    const points = []
    const filt = filterParams(data, param)

    uniqueX.forEach((elem) => { // Loop through list of unique X coords
        const arr = filt.filter(e => (e.x == elem)) // Filter gene data by X coords

        if (arr.length > 0) { // Avoid error
            const sum = arr.reduce(function (total, currentValue) { // Total frequency of gene according to X coord given
                return (total + currentValue.freq);
            }, 0)
            const average = sum / arr.length  // Average of freq of given X coord
    
            points.push({ // Create points to be plotted on line graph
                x: elem,
                y: average
            })
        }
    })
    return points;
}