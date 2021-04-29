import styled from 'styled-components';

const Text = styled.p`
    font-size: 18px;
    padding-left: ${({ theme }) => theme.smallPaddingH};
    padding-right: ${({ theme }) => theme.smallPaddingH};   
`

const ArticleText = ({children}) => {

    return (
        <Text>
            {children}
        </Text>
    )
}

export default ArticleText;