import styled from 'styled-components';
import classnames from 'classnames';

const Wrapper = styled.div`
    width: 100%;
`
const InnerWrapper = styled.div`
    position: relative;
    max-width: ${({ theme }) => theme.articleMaxWidth};
    margin-left: auto;
    margin-right: auto;
    &.wrapper-toc {
        display: grid;
        grid-template-columns: 70% 30%;
    }
`

const ArticleBody = ({hasTOC, children}) => {

    return (
        <Wrapper>
            <InnerWrapper className={classnames({'wrapper-toc': hasTOC})}>
                {children}
            </InnerWrapper>
        </Wrapper>
    )
}

export default ArticleBody;