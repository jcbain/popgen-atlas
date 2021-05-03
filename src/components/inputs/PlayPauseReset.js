import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Play, Pause, Reset } from '@styled-icons/boxicons-regular';

const Wrapper = styled.div`
    width: 100px;
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
    /* padding-top: 20px; */
    /* padding-bottom: 20px; */
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

const PlayPauseReset = ({ resetter, script, stepInterval}) => {

    const [ play, setPlay ] = useState(false);
    const [ currentPoint, setCurrentPoint ] = useState(0);

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
            <ButtonWrapper onClick={() => setPlay(prev => !prev)}>
                {play ? <StyledPause /> : <StyledPlay />}
            </ButtonWrapper>
            <ButtonWrapper onClick={reset}>
                <StyledReset />
            </ButtonWrapper>

        </Wrapper>
    )
}

export default PlayPauseReset;