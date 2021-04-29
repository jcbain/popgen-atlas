import { ThemeProvider } from 'styled-components';

import ArticleHeader from '../../components/articleComponents/ArticleHeader';
import ArticleWrapper from '../../components/articleComponents/ArticleWrapper';
import ArticleBody from '../../components/articleComponents/ArticleBody'
import ArticleContent from '../../components/articleComponents/ArticleContent'
import ArticleToc from '../../components/articleComponents/ArticleToc';
import ArticleText  from '../../components/articleComponents/ArticleText';

import Migration from './Migration';
import msTheme from './theme';

const MigrationSelectionBalance = () => {
    const headers = [
        {text: 'Something'},
        {text: 'Something 2'},
        {text: 'Something 3'}
    ]
    return (
        <ThemeProvider theme={msTheme}>
            <ArticleWrapper>
                <ArticleHeader title={"Migration Selection Balance"}/>
                <ArticleBody hasTOC={true}>
                    <ArticleContent>
                        <ArticleText>
                            We pride ourselves not only on our robust feature set, but our back-end performance and non-complex use is frequently considered a terrific achievement. That is a remarkable achievement taking into account this month's financial state of things! If all of this comes off as mixed-up to you, that's because it is! Quick: do you have a infinitely reconfigurable scheme for coping with emerging methodologies? Is it more important for something to be leading-edge or to be customer-directed? What does the industry jargon 'C2B2B' really mean? We apply the proverb 'Look before you leap' not only to our content but our power shifts but our power shifts but our power to repurpose. Have you ever needed to matrix your cutting-edge feature set? Without filling out any forms? If all of this may seem remarkable to you, that's because it is! A company that can streamline elegantly will (at some unspecified point in the future) be able to engineer easily. What do we harness? Anything and everything, regardless of obscureness! Our feature set is unparalleled in the industry, but our C2C2C paradigms and easy configuration is always considered a terrific achievement. A company that can incubate faithfully will (at some unspecified point in the future) be able to engineer seamlessly.

                        </ArticleText>
                        <Migration />
                        <ArticleText>
                            We pride ourselves not only on our robust feature set, but our back-end performance and non-complex use is frequently considered a terrific achievement. That is a remarkable achievement taking into account this month's financial state of things! If all of this comes off as mixed-up to you, that's because it is! Quick: do you have a infinitely reconfigurable scheme for coping with emerging methodologies? Is it more important for something to be leading-edge or to be customer-directed? What does the industry jargon 'C2B2B' really mean? We apply the proverb 'Look before you leap' not only to our content but our power shifts but our power shifts but our power to repurpose. Have you ever needed to matrix your cutting-edge feature set? Without filling out any forms? If all of this may seem remarkable to you, that's because it is! A company that can streamline elegantly will (at some unspecified point in the future) be able to engineer easily. What do we harness? Anything and everything, regardless of obscureness! Our feature set is unparalleled in the industry, but our C2C2C paradigms and easy configuration is always considered a terrific achievement. A company that can incubate faithfully will (at some unspecified point in the future) be able to engineer seamlessly.

                        </ArticleText>
                        <ArticleText>
                            We pride ourselves not only on our robust feature set, but our back-end performance and non-complex use is frequently considered a terrific achievement. That is a remarkable achievement taking into account this month's financial state of things! If all of this comes off as mixed-up to you, that's because it is! Quick: do you have a infinitely reconfigurable scheme for coping with emerging methodologies? Is it more important for something to be leading-edge or to be customer-directed? What does the industry jargon 'C2B2B' really mean? We apply the proverb 'Look before you leap' not only to our content but our power shifts but our power shifts but our power to repurpose. Have you ever needed to matrix your cutting-edge feature set? Without filling out any forms? If all of this may seem remarkable to you, that's because it is! A company that can streamline elegantly will (at some unspecified point in the future) be able to engineer easily. What do we harness? Anything and everything, regardless of obscureness! Our feature set is unparalleled in the industry, but our C2C2C paradigms and easy configuration is always considered a terrific achievement. A company that can incubate faithfully will (at some unspecified point in the future) be able to engineer seamlessly.

                        </ArticleText>
                    </ArticleContent>
                    <ArticleToc headers={headers}/>
                </ArticleBody>
            </ArticleWrapper>
        </ThemeProvider>
    )
}

export default MigrationSelectionBalance;