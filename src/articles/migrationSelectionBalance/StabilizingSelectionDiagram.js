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
    background: pink;
`

const StabilizingSelectionDiagram = ({}) => {

    return (
        <Wrapper>
            <DrawingArea>

            </DrawingArea>
        </Wrapper>
    )
}

export default StabilizingSelectionDiagram;