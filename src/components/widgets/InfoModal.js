import styled from 'styled-components';

const ModalWrapper = styled.div`
    position: fixed;
    top: calc(50% - 200px);
    left: calc(50% - 250px);
    border: 1px solid black;
    border-radius: 5px;
    /* height: 400px; */
    max-height: 400px;
    width: 500px;
    background: white;
    z-index: 1000;
`

const ContentWrapper = styled.div`
    display: grid;
    grid-template-rows: 0.2fr 1fr;
    padding: 30px 40px 40px 40px;
    align-items: center;
    justify-content: center;
`

const Title = styled.p`
    text-align: center;
    font-weight: bold;
    font-size: 22px;
`

const InfoContainer = styled.div`
    text-align: center;

`

const InfoModal = ({title, children}) => {

    return (
        <ModalWrapper>
            <ContentWrapper>
                <Title>{title}</Title>
                <InfoContainer>{children}</InfoContainer>
            </ContentWrapper>
        </ModalWrapper>
    )
}

export default InfoModal;