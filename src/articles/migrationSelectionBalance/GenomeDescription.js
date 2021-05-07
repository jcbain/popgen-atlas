import { useState } from 'react';
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

const StyledGenome = styled(Genome)`
    position: absolute;
    top: calc(50% - 135px);
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

const rand = (prob) => Math.random() < prob;

const generateData = () => {
    let data = []
    let defaultProb = 0.20;
    const modifier = 0.05;
    for(let i = 0; i < 100; i++){
        const mutate = rand(defaultProb);
        let value;
        if (mutate) {
            defaultProb += modifier;
            value = Math.random();
        } else {
            defaultProb = 0.2;
            value = 0
        }
        data.push(value);
    }
    return data;

}
const ind = generateData();

const GenomeDescription = ({}) => {
    const [ showGenomeExample, setShowGenomeExample ] = useState(false)
 
    
    return (
        <Wrapper>
            <DrawingArea>
                <StyledBuddy src={buddyRed} className={classnames({'example-buddy-disappear': showGenomeExample})}/>
                <StyledGenome data={ind} className={classnames({'example-genome-show': showGenomeExample})}/>
            </DrawingArea>
            <ButtonBar>
                <button onClick={() => setShowGenomeExample(prev => !prev)}> Click me</button>
            </ButtonBar>
        </Wrapper>
    )

}

export default GenomeDescription;