import styled from 'styled-components';

const Wrapper = styled.aside`
    width: 100%;
    position: sticky;
    top: ${({ theme }) => theme.headerHeight};
    height: 500px;
    padding-top: 20px;
`

const ArticleStickyAside = ({children}) => {

    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

export default ArticleStickyAside;