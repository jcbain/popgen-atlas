import styled from 'styled-components';

const Text = styled.h2`
    font-size: 20px;
    padding-left: ${({ theme }) => theme.smallPaddingH};
    padding-right: ${({ theme }) => theme.smallPaddingH};   
`

const ArticleSectionTitle = ({children}) => {

    return (
        <Text>
            {children}
        </Text>
    )
}

export default ArticleSectionTitle;