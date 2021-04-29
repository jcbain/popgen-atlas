import styled from 'styled-components';
import classnames from 'classnames'

import buddyRed from '../../images/buddy_red.png';
import buddyBlue from '../../images/buddy_blue.png';
import buddyPurple from '../../images/buddy_purple.png';
import classNames from 'classnames';

const buddies = { red: buddyRed, blue: buddyBlue, purple: buddyPurple };

const Wrapper = styled.div`
    width: 100%;
    height: 400px;
`

const DrawingArea = styled.div`
    position: relative;
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 1fr 1fr;
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
    top: 10px;
    left: ${({ leftperc }) => leftperc}%;
    width: 5%;
`

const Migration = ({}) => {

    return (
        <Wrapper>
            <DrawingArea>
                <LandDivider />
                <LandDivider className={classNames({'cold-side': true})}/>
                <BuddyImg src={buddies.red} leftperc={10}/>
                <BuddyImg src={buddies.blue} leftperc={90}/>
            </DrawingArea>
        </Wrapper>
    )
}

export default Migration;

