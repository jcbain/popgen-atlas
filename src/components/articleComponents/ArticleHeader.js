import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    height: 500px;
    background: ${({ theme }) => theme.articleHeaderColor};
`

const Title = styled.h1`
    max-width: 760px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`

const ArticleHeader = ({title}) => {

    return (
        <Wrapper>
            <Title>{title}</Title>
        </Wrapper>
    )
}

export default ArticleHeader;

