import classNames from 'classnames';
import styled from 'styled-components';

const Wrapper = styled.aside`
    width: 100%;
    display: block;
    &.no-show {
        display: none;
    }
    /* background: blue; */
`

const ArticleAnimationBox = ({show, children}) => {

    return (
        <Wrapper className={classNames({'no-show': !show})}>
            {children}
        </Wrapper>
    )
}

export default ArticleAnimationBox;