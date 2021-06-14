import { forwardRef } from 'react';
import styled from 'styled-components';
import { X } from '@styled-icons/boxicons-regular';

import useOutsideAlerter from '../../hooks/useOutsideAlerter'

const ModalWrapper = styled.div`
    position: fixed;
    top: calc(50% - 200px);
    left: calc(50% - 250px);
    border: 2px solid #303030;
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
    color: ${({ theme }) => theme.modalTitleColor};
`

const InfoContainer = styled.div`
    text-align: center;
    color: ${({ theme }) => theme.modalContentColor};
`

const XContainer = styled.div`
    width: 20px;
    height: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;

`

const InfoModal = forwardRef(({title, xAction, children}, ref) => {

    useOutsideAlerter(ref, xAction)

    return (
        <ModalWrapper ref={ref}>
            <XContainer onClick={xAction}>
                <X/>
            </XContainer>
            <ContentWrapper>
                <Title>{title}</Title>
                <InfoContainer>{children}</InfoContainer>
            </ContentWrapper>
        </ModalWrapper>
    )
})

export default InfoModal;