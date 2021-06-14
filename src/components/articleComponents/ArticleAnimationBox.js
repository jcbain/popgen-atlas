import styled from 'styled-components';

const Wrapper = styled.aside`
    width: 100%;
    position: sticky;
    top: 50px;
    height: 400px;
    background: blue;
`

const ArticleAnimationBox = ({children}) => {

    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

export default ArticleAnimationBox;