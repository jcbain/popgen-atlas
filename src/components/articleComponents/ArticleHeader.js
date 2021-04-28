import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    height: 500px;
    background: ${({ theme }) => theme.articleHeaderColor};
    display: grid;
    align-items: center;
`

const Title = styled.h1`
    max-width: ${({ theme }) => theme.articleMaxWidth};
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    color: ${({ theme }) => theme.articleTitleColor};
    font-family: ${({ theme }) => theme.funFont};
`

const ArticleHeader = ({title}) => {

    return (
        <Wrapper>
            <Title>{title}</Title>
        </Wrapper>
    )
}

export default ArticleHeader;

