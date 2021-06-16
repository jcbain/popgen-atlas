import { useState } from 'react';
import styled from 'styled-components';
import classnames from 'classnames'

import PlayPauseReset from '../../components/inputs/PlayPauseReset'
import usePlayPauseReset from '../../hooks/usePlayPauseReset';

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
    /* width: 5%; */
    transition: all 0.5s;
    &.adult {
        width: 5%;
        &.adult-show {
            opacity: 1;
        }
        &.adult-hide{ 
            opacity: 0;
        }
    }
    &.transfer{
        top: ${({ transfertop }) => transfertop}%;
        left: ${({ transferleft }) => transferleft}%;
    }
    &.disappear{
        opacity: 0;
    }
    &.offspring{
        transition: opacity ${( { multiple }) => 0.5 + multiple}s;
        width: 3.5%;
        &.offspring-show{
            opacity: 1;
        }
        &.offspring-hide{
            opacity: 0;
        }
        &.grow{
            width: 5%;
        }
        &.die {
            opacity: 0;
        }
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
    {color: 'red', top: 80, left: 35, transfer: true, transferTop: 20, transferLeft: 70},
    {color: 'blue', top: 80, left: 60},
    {color: 'red', top: 15, left: 5, offspring: true, lives: true, grow: true},
    {color: 'blue', top: 15, left: 90, offspring: true, lives: true,  grow: true, multiple: 0.1},
    {color: 'purple', top: 25, left: 15, offspring: true, lives: true,  grow: false},
    {color: 'blue', top: 25, left: 80, offspring: true, lives: true, grow: true, multiple: 0.2},
    {color: 'blue', top: 15, left: 25, offspring: true, lives: true, grow: false},
    {color: 'blue', top: 15, left: 70, offspring: true, lives: true, grow: true, multiple: 0.3},
    {color: 'red', top: 25, left: 35, offspring: true, lives: true, grow: true},
    {color: 'blue', top: 25, left: 60, offspring: true, lives: true, grow: true},
    {color: 'red', top: 35, left: 5, offspring: true, lives: true, grow: true},
    {color: 'blue', top: 35, left: 90, offspring: true, lives: true, grow: true},
    {color: 'red', top: 45, left: 15, offspring: true, lives: true, grow: true},
    {color: 'blue', top: 45, left: 80, offspring: true, lives: true, grow: true},
    {color: 'red', top: 35, left: 25, offspring: true, lives: true, grow: true},
    {color: 'blue', top: 35, left: 70, offspring: true, lives: true, grow: true},
    {color: 'purple', top: 45, left: 35, offspring: true, lives: true, grow: false},
    {color: 'blue', top: 45, left: 60, offspring: true, lives: true, grow: true},
    {color: 'blue', top: 55, left: 5, offspring: true, lives: true, grow: false},
    {color: 'blue', top: 55, left: 90, offspring: true, lives: true, grow: true},
    {color: 'red', top: 65, left: 15, offspring: true, lives: true, grow: true},
    {color: 'blue', top: 65, left: 80, offspring: true, lives: true, grow: true},
    {color: 'purple', top: 55, left: 25, offspring: true, lives: true, grow: false},
    {color: 'purple', top: 55, left: 70, offspring: true, lives: true, grow: false},
    {color: 'red', top: 65, left: 35, offspring: true, lives: true, grow: true},
    {color: 'red', top: 65, left: 60, offspring: true, lives: true, grow: false},
    {color: 'red', top: 75, left: 5, offspring: true, lives: true, grow: true},
    {color: 'purple', top: 75, left: 90, offspring: true, lives: true, grow: false},
    {color: 'red', top: 85, left: 15, offspring: true, lives: true, grow: true},
    {color: 'red', top: 85, left: 80, offspring: true, lives: true, grow: false},
    {color: 'red', top: 75, left: 25, offspring: true, lives: true, grow: true},
    {color: 'purple', top: 75, left: 70, offspring: true, lives: true, grow: false},
    {color: 'red', top: 85, left: 35 , offspring: true, lives: true, grow: true},
    {color: 'blue', top: 85, left: 60, offspring: true, lives: true, grow: true},
]



const Migration = ({showDiagram}) => {
    const [ migrate, setMigrate ] = useState(false)
    const [ offspring, setOffspring ] = useState(false);
    const [ grow, setGrow ] = useState(false);

    const script = [
        {action: () => {
            showDiagram()
            setMigrate(true)
        }, description: 'migration'},
        {action: () => setOffspring(true), description: 'offspring'},
        {action: () => {
            setGrow(true)
            setMigrate(false)
        }, description: 'differential survival'},
        {action: () => {}, description: ''}
    ]

    const resetter = () => {   
        setMigrate(false)
        setOffspring(false)
        setGrow(false)
    }

    const [ setPlay, reset, isPlaying, currentPosition ] = usePlayPauseReset(script, resetter, 2)


    const buds = buddyPositions.map((b, i) => {
        return (
            <BuddyImg key={i}
                className={classnames({
                    'transfer': b.transfer && migrate, 
                    'offspring-show': offspring, 
                    'offspring-hide': !offspring,
                    'grow': grow && b.grow, 
                    'die': grow && !b.grow,
                    'adult-show': !offspring,
                    'adult-hide': offspring,
                    'offspring': b.offspring,
                    'adult': !b.offspring
                })}
                src={b.color === 'red' ? buddies.red : b.color === 'blue' ? buddies.blue : buddies.purple}
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
            </DrawingArea>
            <ButtonBar>
                <PlayPauseReset script={script} setPlay={setPlay} reset={reset} isPlaying={isPlaying} currentPosition={currentPosition} />
            </ButtonBar>
        </Wrapper>
    )
}

export default Migration;

