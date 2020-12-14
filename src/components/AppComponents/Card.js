import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardDiv = styled.div`
    width: 100%;
    height: 420px;
    border: 3px solid ${({ theme }) => theme.textColor};
    color: ${({ theme }) => theme.textColor};
    padding: 5px 10px;
`;

const Title = styled.h2`
    font-family: ${({ theme }) => theme.fontFlashy};
    font-weight: 800;
    font-size: 18px;
`

const Description = styled.p`
    color: ${({ theme }) => theme.darkGray};
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    &:active {
        text-decoration: none;
    }
    &:hover {
        text-decoration: none;
    }
    &:visited {
        text-decoration: none;
    }
`;

const Card = (props) => {

    const { title, description, id, match } = props;

    return (
        <CardDiv>
            <StyledLink to={`${match.url}/${id}`}>
                <Title>{ title }</Title>
                <Description>{ description}</Description>
            </StyledLink>
        </CardDiv>
    )
}

export default Card;