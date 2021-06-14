import styled from 'styled-components';

const Wrapper = styled.aside`
    width: 100%;
    position: sticky;
    top: 50px;
    height: 500px;
`

const ArticleStickyAside = ({children}) => {

    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

export default ArticleStickyAside;