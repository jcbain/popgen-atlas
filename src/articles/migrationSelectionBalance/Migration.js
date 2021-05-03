import { useState } from 'react';
import styled from 'styled-components';
import classnames from 'classnames'

import PlayPauseReset from '../../components/inputs/PlayPauseReset'

import buddyRed from '../../images/buddy_red.png';
import buddyBlue from '../../images/buddy_blue.png';
import buddyPurple from '../../images/buddy_purple.png';

const buddies = { red: buddyRed, blue: buddyBlue, purple: buddyPurple };

const Wrapper = styled.div`
    width: calc(100% - 40px);
    height: 400px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 80px;
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

const LandDivider = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.hotSideColor};
    &.cold-side {
        background-color: ${({ theme }) => theme.coldSideColor};
    }
`

const BuddyImg = styled.img`
    position: absolute;
    top: ${({ topperc }) => topperc}%;
    left: ${({ leftperc }) => leftperc}%;
    width: 5%;
    transition: all 0.5s;
    &.transfer{
        top: ${({ transfertop }) => transfertop}%;
        left: ${({ transferleft }) => transferleft}%;
    }
    &.disappear{
        display: none;
    }
`

const buddyPositions = [
    {color: 'red', top: 10, left: 5},
    {color: 'blue', top: 10, left: 90, transfer: true, transferTop: 25, transferLeft: 20},
    {color: 'red', top: 20, left: 15},
    {color: 'blue', top: 20, left: 80},
    {color: 'red', top: 10, left: 25},
    {color: 'blue', top: 10, left: 70},
    {color: 'red', top: 20, left: 35},
    {color: 'blue', top: 20, left: 60},
    {color: 'red', top: 30, left: 5},
    {color: 'blue', top: 30, left: 90},
    {color: 'red', top: 40, left: 15},
    {color: 'blue', top: 40, left: 80},
    {color: 'red', top: 30, left: 25},
    {color: 'blue', top: 30, left: 70},
    {color: 'red', top: 40, left: 35},
    {color: 'blue', top: 40, left: 60},
    {color: 'red', top: 50, left: 5},
    {color: 'blue', top: 50, left: 90},
    {color: 'red', top: 60, left: 15},
    {color: 'blue', top: 60, left: 80},
    {color: 'red', top: 50, left: 25},
    {color: 'blue', top: 50, left: 70},
    {color: 'red', top: 60, left: 35},
    {color: 'blue', top: 60, left: 60},
    {color: 'red', top: 70, left: 5},
    {color: 'blue', top: 70, left: 90},
    {color: 'red', top: 80, left: 15},
    {color: 'blue', top: 80, left: 80},
    {color: 'red', top: 70, left: 25},
    {color: 'blue', top: 70, left: 70},
    {color: 'red', top: 80, left: 35},
    {color: 'blue', top: 80, left: 60}
]

const Migration = ({}) => {
    const [ migrate, setMigrate ] = useState(true)
    const [ die, setDie ] = useState(false);
    const [ positionModified, setPositionModified ] = useState(false);
    const [counter, setCounter] = useState(0)


    const buds = buddyPositions.map((b, i) => {
        return (
            <BuddyImg key={i}
                className={classnames({'transfer': b.transfer && migrate, 'disappear': die})}
                src={b.color === 'red' ? buddies.red : buddies.blue}
                leftperc={b.left}
                topperc={b.top}
                transfertop={b.transferTop}
                transferleft={b.transferLeft}
            />
        )
    })
    

    return (
        <Wrapper>
            <DrawingArea>
                <LandDivider />
                <LandDivider className={classnames({'cold-side': true})}/>
                {buds}
                {/* <BuddyImg src={buddies.red} leftperc={5} topperc={10}/>
                <BuddyImg src={buddies.blue} leftperc={90} topperc={10}/> */}
            </DrawingArea>
            <><PlayPauseReset updater={() => setCounter(prev => prev + 1)} resetter={() => setCounter(0)} /><p>{counter}</p></>
            {/* <button onClick={() => setDie(prev => !prev)}>Click Me</button> */}
        </Wrapper>
    )
}

export default Migration;

