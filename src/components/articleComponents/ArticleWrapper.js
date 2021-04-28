import styled from 'styled-components';

const Wrapper = styled.main`
    width: 100vw;
    margin: 0;
`

const ArticleWrapper = ({children}) => {
    
    return (
        <Wrapper>
            {children}
        </Wrapper>
        )
}

export default ArticleWrapper;