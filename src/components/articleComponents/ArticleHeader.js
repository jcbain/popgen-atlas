import styled from 'styled-components';

import StickyNavCushion from '../pageComponents/StickyNavCushion';


const Wrapper = styled.div`
    width: 100%;
    height: 500px;
    background: ${({ theme }) => theme.articleHeaderColor};
`

const Title = styled.h1`
    max-width: ${({ theme }) => theme.articleMaxWidth};
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    color: ${({ theme }) => theme.articleTitleColor};
    font-family: ${({ theme }) => theme.serifFont};
    line-height: 500px;
`

const ArticleHeader = ({title}) => {

    return (
        <Wrapper>
            <StickyNavCushion />
            <Title>{title}</Title>
        </Wrapper>
    )
}

export default ArticleHeader;

