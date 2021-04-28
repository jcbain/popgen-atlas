import styled from 'styled-components';

const Wrapper = styled.aside`
    width: 100%;
    position: sticky;
    top: 50px;
    height: 400px;
    padding: 0px ${({ theme }) => theme.smallPaddingV};
`

const SectionText = styled.p`
    font-size: 18px;
`

const ArticleToc = ({headers}) => {

    const sections = headers.map((h, i) => {
        return (
            <SectionText key={i}>{h.text}</SectionText>
        )
    })

    return (
        <Wrapper>
            {sections}
        </Wrapper>
    )
}

export default ArticleToc;