import styled from 'styled-components';
import classnames from 'classnames';

import StickyNavCushion from '../pageComponents/StickyNavCushion';

const Wrapper = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.articleBodyColor};
`
const InnerWrapper = styled.div`
    position: relative;
    max-width: ${({ theme }) => theme.articleMaxWidth};
    margin-left: auto;
    margin-right: auto;
    &.wrapper-toc {
        display: grid;
        grid-template-columns: 55% 45%;
    }
`

const ArticleBody = ({hasTOC, children}) => {

    return (
        <Wrapper>
            <StickyNavCushion />
            <InnerWrapper className={classnames({'wrapper-toc': hasTOC})}>
                {children}
            </InnerWrapper>
        </Wrapper>
    )
}

export default ArticleBody;