import styled from 'styled-components';

const chartSize = () => {
    var StyledCanvas = styled.canvas`
        position: absolute;
        width: 100%;
        height: ${({ heightperc }) => heightperc}%;
    `
    var StyledForeign = styled.foreignObject`
        width: 100%;
        height: 100%;
    `
    return [StyledCanvas, StyledForeign]
}

export default chartSize;