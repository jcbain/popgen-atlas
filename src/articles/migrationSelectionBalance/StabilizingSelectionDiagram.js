import { useEffect, useRef } from 'react';
import { line, scaleLinear, extent, select } from 'd3'

import styled from 'styled-components';

import buddyRed from '../../images/buddy_red.png';
import buddyBlue from '../../images/buddy_blue.png';
import buddyPurple from '../../images/buddy_purple.png';

const buddies = { red: buddyRed, blue: buddyBlue, purple: buddyPurple };

const Wrapper = styled.div`
    width: calc(100% - 40px);
    height: 400px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 100px;
`

const ButtonBar = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
`

const DrawingArea = styled.div`
    position: relative;
    display: grid;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: 2px solid; 
    background: ${({ theme }) => theme.hotSideColor};;
`

const normal = () => {
    let x = 0,
        y = 0,
        rds, c;
    do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        rds = x * x + y * y;
    } while (rds == 0 || rds > 1);
        c = Math.sqrt(-2 * Math.log(rds) / rds); // Box-Muller transform
    return x * c; // throw away extra sample y * c
}

const gaussian = (x) => {
    const gaussianConstant = 1 / Math.sqrt(2 * Math.PI),
	    mean = 0,
    	sigma = 1;

    x = (x - mean) / sigma;
    return gaussianConstant * Math.exp(-.5 * x * x) / sigma;
};

const getData = () => {
    let data = []
    for (var i = 0; i < 100000; i++) {
        const q = normal() // calc random draw from normal dist
        const p = gaussian(q) // calc prob of rand draw
        const el = {
            "q": q,
            "p": p
        }
        data.push(el)
    };
    
    // need to sort for plotting
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    data.sort(function(x, y) {
        return x.q - y.q;
    });	

    return data;
}

const StabilizingSelectionDiagram = ({}) => {
    const ref = useRef()
    const data = getData()
    console.log(data)

    useEffect(() => {

        

        if (ref.current){
            const margin = {
                top: 20,
                right: 20,
                bottom: 30,
                left: 50
            }
    
            const width = ref.current.clientWidth - margin.left - margin.right;
            const height = ref.current.clientHeight - margin.top - margin.bottom;
            const x = scaleLinear()
                .range([0, width])
                .domain(extent(data, d => d.q));
    
            const y = scaleLinear()
                .range([height, 0])
                .domain(extent(data, d => d.p));
    
            const drawLine = line()
                .x(d =>  {
                    return x(d.q);
                })
                .y(d =>  {
                    return y(d.p);
                });
            console.log(ref.current)
            const svg = select(ref.current)
                .append('svg')
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
       
        
        }
    }, [])

    return (
        <Wrapper>
            <DrawingArea ref={ref}>

            </DrawingArea>
        </Wrapper>
    )
}



export default StabilizingSelectionDiagram;