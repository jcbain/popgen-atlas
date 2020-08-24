import React, {useState } from 'react';
import styled from 'styled-components';
import ChartViewMain, { ChartViewGenomeChart } from './components/DashboardComponent/ChartView/ChartViewComponent'



const MainDiv = styled.div`
    width: 80%;
    height: 50%

`





export const PlayGround = (props) => {
    // const svgHeight = 100;
    // const svgWidth = 500;
    // const leftPaddingPercent = 10;
    // const rightPaddingPercentt = 20;
    
    // const stops1 = [...Array(51)].map((d, i) => {
    //     let othercolor = 'white';
    //     if (i === 0 || i === 50) {
    //         othercolor = 'orange'
    //     }
    //     return (
    //         <stop key={i} stopColor={i % 2 === 0 ? othercolor : 'blue'} offset={`${i * 2}%`}/>
    //     )

    // })

    let initParams = {}
    props.paramOptions.map(d => {
        return initParams[d.paramName] = d.options[0].value;
    })

    return (
        <MainDiv>
            {/* <svg>
                <linearGradient id={"gradient1"} x1={"0"} x2={"0"} y1={"0%"} y2={"100%"}>
                    {stops1}
                </linearGradient>
            </svg>
            <svg height="10vh" width="100%" viewBox={[0, 0, 1000, 100]}>
                <rect fill={"url(#gradient1)"} x={1000 * (leftPaddingPercent/100)} y={0} height={100} width={1000 * (1 - ((leftPaddingPercent + rightPaddingPercentt)/100))}/>
            </svg>
            <svg height="20vh" width="100%" viewBox={[0, 0, 375, 75]}>
                <rect fill={"url(#gradient1)"} x={`${leftPaddingPercent}%`} y={0} height={75} width={`${100 - leftPaddingPercent - rightPaddingPercentt}%`}/>
            </svg> */}
        </MainDiv>
    )
}