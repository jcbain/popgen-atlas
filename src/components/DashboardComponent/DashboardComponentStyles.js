import styled from 'styled-components';

export const DashboardComponentContainer = styled.div`
    position: relative;
    display: ${props => props.display};
    flex-direction: row;
    justify-content: space-between;
    grid-area: ${props => props.gridarea || 'none'};
    width: ${props => props.viewwidth}vw;
    height: ${props => props.viewheight}vh;
    background-color: ${props => props.theme.color.main};
    padding-left: 1vw;
    padding-right: 1vw;
    padding-top: 2vh;
    border: 1px solid ${props => props.theme.color.graySecondary};
`

DashboardComponentContainer.defaultProps = {
    theme : {
        color : {
            graySecondary: '#efefef',
        }
    }
}
