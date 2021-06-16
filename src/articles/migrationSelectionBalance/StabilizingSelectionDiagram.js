import { useEffect, useRef, useState } from 'react';
import { line, scaleLinear, extent, select } from 'd3'
import styled, { ThemeProvider } from 'styled-components';
import classNames from 'classnames';

import buddyRed from '../../images/buddy_red.png';
import buddyBlue from '../../images/buddy_blue.png';
import buddyPurple from '../../images/buddy_purple.png';
import normalData from './data/normal.json'
import FunButton from '../../components/buttons/FunButton'

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
    & > button {
        margin-right: 10px;
    }
`

const DrawingArea = styled.div`
    position: relative;
    display: grid;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: 2px solid; 
    background: ${({ theme }) => theme.hotSideColor};
    &.cold {
        background: ${({ theme }) => theme.coldSideColor};
    }
`


const BuddyImg = styled.img`
    position: absolute;
    top: ${({ toppix }) => toppix}px;
    left: ${({ leftpix }) => leftpix}px;
    width: 10%;
    transition: all 0.5s;
`

const PhenotypeBar = styled.div`
    position: absolute;
    top: 93%;
    left: 60px;
    width: calc(100% - 80px);
    height: 12px;
    background: linear-gradient(to right, ${({ theme }) => theme.legendHigh} 0%, ${({ theme }) => theme.legendMidHigh} 50%, ${({ theme }) => theme.legendMidLow} 75%, ${({ theme }) => theme.legendLow} 100% );
    border: 2px solid #303030;
    border-radius: 4px;
    transition: all 0.5s;

    &.cold {
        background: linear-gradient(to right, ${({ theme }) => theme.legendLow} 0%, ${({ theme }) => theme.legendMidLow} 50%, ${({ theme }) => theme.legendMidHigh} 75%, ${({ theme }) => theme.legendHigh} 100% );
    }
`

const Label = styled.p`
    position: absolute;
    top: 90%;
    left: 64px;
    font-size: 12px;
    color: #ffffff;
    font-weight: 800;

`

const Arrow = styled.div`
    position: absolute;
    top: 40px;
    left: 20px;
    height: calc(100% - 110px);
    width: 20px;
`

const ArrowLine = styled.div`
    position: absolute;
    width: 2px;
    height: 100%;
    left: calc(50% - 1px);
    background: #303030;
`

const ArrowPointLeft = styled.div`
    position: absolute;
    top: 10;
    height: 2px;
    width: 40%;
    transform: rotate(60deg);
    translate: 8px 3px;
    background: #303030;
`

const ArrowPointRight = styled.div`
    position: absolute;
    top: 10;
    height: 2px;
    width: 40%;
    transform: rotate(-60deg);
    translate: 4px 3px;
    background: #303030;
`

const SecondLabel = styled.p`
    position: absolute;
    top: 72%;
    left: 15px;
    font-size: 12px;
    color: #303030;
    font-weight: 800;
    transform: rotate(90deg);
`

const colors = {reds: {
    red1: '#eb4034',
    red2: '#962921',
    red3: '#ffcdc9'
}}

const warmTheme = {
    buttonPrimary: colors.reds.red1,
    buttonSecondary: colors.reds.red2,
    buttonTertiary: colors.reds.red3,
}


const StabilizingSelectionDiagram = ({}) => {
    const ref = useRef()
    const [isCold, setIsCold] = useState(false)

    const data = normalData;

    useEffect(() => {

        if (ref.current){
            const margin = {
                top: 40,
                right: 20,
                bottom: 70,
                left: 60
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
                .attr("d", drawLine)
                .attr('stroke', '#303030')
                .attr('stroke-width', '4px')
                .attr('fill', 'none');
       
        
        }
    }, [])

    return (
        <Wrapper>
            <DrawingArea className={classNames({'cold': isCold})} ref={ref}>
                <BuddyImg src={buddies.red} toppix={isCold ? 290 : 30} leftpix={isCold ? 335 : 215}/>
                <BuddyImg src={buddies.purple} toppix={160} leftpix={275}/>
                <BuddyImg src={buddies.blue} toppix={isCold ? 30 : 290} leftpix={isCold ? 215 : 335}/>
                
                <PhenotypeBar className={classNames({'cold': isCold})} />
                <Label>individual phenotype</Label>
                <Arrow>
                    <ArrowLine />
                    <ArrowPointLeft />
                    <ArrowPointRight />
                </Arrow>
                <SecondLabel>fitness</SecondLabel>
            </DrawingArea>
            <ButtonBar>
                <ThemeProvider theme={warmTheme}>
                    <FunButton className={classNames({'not-triggered': isCold, 'triggered': !isCold})} onClick={() => setIsCold(prev => !prev)}>
                        Warm Environment
                    </FunButton>
                </ThemeProvider>
                
                <FunButton className={classNames({'not-triggered': !isCold, 'triggered': isCold})} onClick={() => setIsCold(prev => !prev)}>
                    Cold Environment
                </FunButton>

            </ButtonBar>
        </Wrapper>
    )
}



export default StabilizingSelectionDiagram;