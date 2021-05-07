import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import classnames from 'classnames'

import buddyRed from '../../images/buddy_red.png';
import Genome from './Genome';


const Wrapper = styled.div`
    width: calc(100% - 40px);
    height: 400px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 80px;
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
    grid-template-columns: 1fr 1fr;
    border-radius: 5px;
    border: 2px solid;
    
`

const StyledBuddy = styled.img`
    position: absolute;
    top: calc(50% - 125px);
    left: calc(50% - 100px);
    width: 200px;
    opacity: 1;
    transition: opacity 0.5s;
    &.example-buddy-disappear {
        opacity: 0;
    }
`

const StyledCanvas = styled.canvas`
    position: absolute;
    top: calc(50% - 125px);
    left: calc(50% - 50px);
    width: 100px;
    height: 250px;
    background: #fffff7;
    border-radius: 50px;
    border: 2px solid #303030;
    opacity: 0;
    transition: opacity 1s;
    &.example-genome-show {
        opacity: 1;
    }
`

const StyledGenome = styled(Genome)`
    position: absolute;
    top: calc(50% - 125px);
    left: calc(50% - 50px);
    width: 100px;
    height: 250px;
    background: #fffff7;
    border-radius: 50px;
    border: 2px solid #303030;
    opacity: 0;
    transition: opacity 1s;
    &.example-genome-show {
        opacity: 1;
    }
`

const ind = [ 0.5, 0, 0, 0.5, 0.4, 0.5, 0, 0, 0, 0, 0.6, 0.6, 0.5, 0.3, 0.1, 0, 0, 0, 0, 0.5]

const GenomeDescription = ({}) => {
    const [ showGenomeExample, setShowGenomeExample ] = useState(false)
    // const ref = useRef()

    // useEffect(() => {
    //     const canvas = ref.current;
    //     const context = canvas.getContext('2d');
    //     // console.log(canvas.height, canvas.width)
    //     canvas.height = 250
    //     canvas.width = 100;

    //     // context.clearRect(0, 0, canvas.width, canvas.height)
    //     ind.forEach((d, i) => {
    //         context.fillRect(0, i * (1/ind.length), canvas.width, i * (1/ind.length) * 2)
    //         context.fillStyle = 'red'
    //     })
    // }, [ref])
    
    return (
        <Wrapper>
            <DrawingArea>
                <StyledBuddy src={buddyRed} className={classnames({'example-buddy-disappear': showGenomeExample})}/>
                {/* <StyledCanvas ref={ref} className={classnames({'example-genome-show': showGenomeExample})}/> */}
                <StyledGenome data={ind} className={classnames({'example-genome-show': showGenomeExample})}/>
            </DrawingArea>
            <ButtonBar>
                <button onClick={() => setShowGenomeExample(prev => !prev)}> Click me</button>
            </ButtonBar>
        </Wrapper>
    )

}

export default GenomeDescription;