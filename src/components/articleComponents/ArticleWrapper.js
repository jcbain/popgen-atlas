import { forwardRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.main`
    width: 100vw;
    margin: 0;
`

const ArticleWrapper = forwardRef(({children}, ref) => {
    
    return (
        <Wrapper ref={ref}>
            {children}
        </Wrapper>
        )
})

export default ArticleWrapper;