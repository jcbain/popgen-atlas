import classNames from 'classnames';
import styled from 'styled-components';

const Wrapper = styled.aside`
    width: 100%;
`

const ArticleAnimationBox = ({show, children}) => {

    return (
        <Wrapper className={classNames({'no-show': !show})}>
            {children}
        </Wrapper>
    )
}

export default ArticleAnimationBox;