import styled from 'styled-components';

export const DashboardComponentContainer = styled.div`
    position: relative;
    display: ${props => props.display};
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.color.main};
    padding-left: 1vw;
    padding-right: 1vw;
    padding-top: 2vh;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.color.graySecondary};
`

DashboardComponentContainer.defaultProps = {
    theme : {
        color : {
            graySecondary: '#efefef',
        }
    }
}
