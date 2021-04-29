import styled from 'styled-components';

const Article = styled.article`
    width: 100%;
    font-family: ${({ theme }) => theme.funFont};
`

const ArticleContent = ({children}) => {

    return (
        <Article>
            {children}
        </Article>
    )
}

export default ArticleContent;