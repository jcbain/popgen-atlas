import styled from 'styled-components';
import { Play, Pause, Reset } from '@styled-icons/boxicons-regular';
import classnames from 'classnames';

import FunButton from '../buttons/FunButton'
import classNames from 'classnames';

const Wrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 0.3fr 1fr;
    /* margin-bottom: 20px; */
`

const PlayResetWrapper = styled.div`
    /* width: 100px; */
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
`

// const ButtonWrapper = styled.button`
//     border: 2px solid ${({ theme }) => theme.playPauseColor};;
//     background-color: white;
//     color: ${({ theme }) => theme.playPauseColor};
//     border-radius: 5px;
//     width: 100%;
// `

const StyledPlay = styled(Play)`
    width: 25px;
    /* color: ${({ theme }) => theme.playPauseColor}; */
`

const StyledPause = styled(Pause)`
    width: 25px;
    /* color: ${({ theme }) => theme.playPauseColor}; */
`

const StyledReset = styled(Reset)`
    width: 25px;
    /* color: ${({ theme }) => theme.playPauseColor}; */
`

const ProgressWrapper = styled.div`
    width: calc(100% - 20px);
    padding-left: 20px;
    /* padding-right: 20px; */
    position: relative;
`

const Bar = styled.div`
    position: absolute;
    top: calc(50% - 2.5px);
    background: ${({ theme }) => theme.progressBarColor};
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
    background: ${({ theme }) => theme.progressBarColor};
    &.dot-selected {
        background: ${({ theme }) => theme.progressHighlight};
    }
`

const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: absolute;
    width: calc(100% - 20px);
    top: 50%;
    height: 20px;
`

const Description = styled.p`
    font-size: 10px;
    text-align: center;
    width: 60px;
    color: ${({ theme }) => theme.progressBarColor};
    &.description-selected {
        color: ${({ theme }) => theme.progressHighlight};
    }

`


const PlayPauseReset = ({ 
    script, 
    setPlay, 
    reset,
    isPlaying,
    currentPosition
}) => {


    let dots = [];
    let descriptions = [];
    script.forEach((element, i) => {
        const dot = <Dot key={i} className={classnames({'dot-selected': i === currentPosition - 1})}/>
        const descript = <Description key={i} className={classnames({'description-selected': i === currentPosition - 1})}>{element.description}</Description>
        dots.push(dot);
        descriptions.push(descript);
    });


    return (
        <Wrapper>
            <PlayResetWrapper>
                <FunButton className={classNames({'not-triggered': !isPlaying, 'triggered': isPlaying})} onClick={() => setPlay(prev => !prev)}>
                    {isPlaying ? <StyledPause /> : <StyledPlay />}
                </FunButton>
                <FunButton className={'not-triggered'} onClick={reset}>
                    <StyledReset />
                </FunButton>

            </PlayResetWrapper>
            <ProgressWrapper>
                <Bar />
                <DotsContainer>
                    {dots}
                </DotsContainer>
                <DescriptionContainer>
                    {descriptions}

                </DescriptionContainer>

            </ProgressWrapper>
        </Wrapper>
    )
}

export default PlayPauseReset;