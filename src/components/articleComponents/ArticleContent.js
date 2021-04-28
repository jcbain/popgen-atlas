import styled from 'styled-components';

const Article = styled.article`
    width: 100%;

`

const ArticleContent = ({children}) => {

    return (
        <Article>
            {children}
        </Article>
    )
}

export default ArticleContent;