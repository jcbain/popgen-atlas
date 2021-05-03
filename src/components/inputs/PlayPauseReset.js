import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Play, Pause, Reset } from '@styled-icons/boxicons-regular';
import classnames from 'classnames';

const Wrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 0.3fr 1fr;
`

const PlayResetWrapper = styled.div`
    /* width: 100px; */
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
`

const ButtonWrapper = styled.button`
    border: 2px solid black;
    background-color: white;
    color: black;
    border-radius: 5px;
    width: 100%;
`

const StyledPlay = styled(Play)`
    width: 25px;
`

const StyledPause = styled(Pause)`
    width: 25px;
`

const StyledReset = styled(Reset)`
    width: 25px;
`

const ProgressWrapper = styled.div`
    width: calc(100% - 40px);
    padding-left: 20px;
    /* padding-right: 20px; */
    position: relative;
`

const Bar = styled.div`
    position: absolute;
    top: calc(50% - 2.5px);
    background: lightgray;
    height: 5px;
    width: calc(100% - 20px);
    border-radius: 2px;
`

const DotsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: absolute;
    width: calc(100% - 20px);
    top: calc(50% - 5px);
    height: 10px;
`

const Dot = styled.div`
    width: 10px;
    border-radius: 50%;
    background: lightgray;
    &.dot-selected {
        background: darkgray;
    }
`

const PlayPauseReset = ({ resetter, script, stepInterval}) => {

    const [ play, setPlay ] = useState(false);
    const [ currentPoint, setCurrentPoint ] = useState(0);

    const dots = script.map((s, i) => {
        return(
            <Dot key={i} className={classnames({'dot-selected': i  === currentPoint - 1})}/>
        )
    })

    const reset = () => {
        setCurrentPoint(0);
        resetter()
        setPlay(false);
    }

    useEffect(() => {
        let interval = null;
        if (play) {
            interval = setInterval(() => {
                setCurrentPoint(s => {
                    if(s >= script.length) {
                        reset()
                    } else {
                        script[s]()
                        return s + 1
                    }
                  
                } );

             }, 1000 * stepInterval);
            } else if (!play && currentPoint !== 0) {
                clearInterval(interval);
            }
        return () => clearInterval(interval);
    }, [play, currentPoint]);

    return (
        <Wrapper>
            <PlayResetWrapper>
                <ButtonWrapper onClick={() => setPlay(prev => !prev)}>
                    {play ? <StyledPause /> : <StyledPlay />}
                </ButtonWrapper>
                <ButtonWrapper onClick={reset}>
                    <StyledReset />
                </ButtonWrapper>

            </PlayResetWrapper>
            <ProgressWrapper>
                <Bar />
                <DotsContainer>
                    {dots}
                </DotsContainer>

            </ProgressWrapper>
        </Wrapper>
    )
}

export default PlayPauseReset;