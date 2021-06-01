import { useRef } from 'react';
import { ThemeProvider } from 'styled-components';

import ArticleHeader from '../../components/articleComponents/ArticleHeader';
import ArticleWrapper from '../../components/articleComponents/ArticleWrapper';
import ArticleBody from '../../components/articleComponents/ArticleBody'
import ArticleContent from '../../components/articleComponents/ArticleContent'
import ArticleToc from '../../components/articleComponents/ArticleToc';
import ArticleText  from '../../components/articleComponents/ArticleText';


import InfoModal from '../../components/widgets/InfoModal';
import usePopup from '../../hooks/usePopup';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';

// import StickyNavCushion from '../../components/pageComponents/StickyNavCushion';

import Map from './Map';
import Migration from './Migration';
import GenomeDescription from './GenomeDescription'
import msTheme from './theme';

const MigrationSelectionBalance = () => {
    const articleRef = useRef()
    const migrationPopupRef = useRef()

    const [ popupMigration, setPopupMigration ] = usePopup(false, articleRef)
    useOutsideAlerter(migrationPopupRef, () => setPopupMigration(false))
    const headers = [
        {text: 'Heading 1'},
        {text: 'Heading 2'},
        {text: 'Heading 3'}
    ]
    return (
        <ThemeProvider theme={msTheme}>
            {popupMigration && <InfoModal ref={migrationPopupRef} title="migration rate (m)"><p>If a seed from a parent tree had a 1% chance of moving to the other patch, then this would be a migration rate of m = 0.01.</p></InfoModal>}

            <ArticleWrapper ref={articleRef}>
            
                
                <ArticleHeader title={"Migration Selection Balance"}/>
                <ArticleBody hasTOC={true}>
                    <ArticleContent>

                        <ArticleText>
                            Many species inhabit spatially variable environments, where the conditions change from one place to another. For example, the natural range of lodgepole pine spans from the temperate climates of northern California up to the subarctic in the Yukon territory. How does one species manage to thrive in such different environments?
                        </ArticleText>
                        <ArticleText>
                            One evolutionary response to a variable environment is “local adaptation”, where different populations become genetically adapted to the conditions they commonly encounter where they live. This specialization arises by the gradual evolution of genetically-based differences in the traits that help the organism survive, grow, and produce seeds for the next generation. Trees grown from seeds collected in the Yukon territory will be more cold-tolerant, stop growing at an earlier date in the autumn, and grow more slowly than trees started from seeds collected in California. Local adaptation tends to involve constraints and trade-offs between traits, where it isn’t possible to optimise all traits at once. For lodgepole pine, the Yukon-adapted genotypes avoid autumn frost damage by stopping growth early and setting buds that are better able to tolerate cold temperatures in winter. But while this shorter growing season helps avoid frost damage, it also limits how much they can grow and compete. By contrast, the California genotypes grow much faster, but are more susceptible to frost damage and would die in the harsh northern winters. 
                        </ArticleText>
                        <ArticleText>
                            Will local adaptation always evolve in response to a spatially variable environment? What if the environment varies over a small spatial scale? Lodgepole pine inhabits valleys where it grows on both the colder mountainsides and the warmer lowlands [link/pointer to picture]. Will the trees growing higher on the mountain evolve to be different than the trees in the lowlands? Or will all the trees adapt to the average conditions across both environments?
                        </ArticleText>
                        <ArticleText>
                            In lodgepole pine, dispersal happens through movement of the seeds and wind-blown pollen transport. If either seeds or pollen have a high chance of ending up in an environment that is not well suited to their genetically-determined traits, they will pay a fitness cost for being maladapted to the new conditions. Local adaptation will only emerge when the rate of dispersal between environments is not too high, relative to the fitness costs of being mismatched to the new environment. 
                        </ArticleText> 
                        <ArticleText>
                            Evolutionary theory provides a way to formally study these trade-offs by using simplified models where individuals can inhabit one of two places with different environments (e.g. a hot or cold climate, represented here by red and blue circles). There are two main parameters that affect evolution in this model: the rate at which offspring move and end up in a different patch than their parents (termed the <span onClick={() => setPopupMigration(true)}>“migration rate”</span>, m), and the effect of the difference between the two environments on an individual’s fitness (the “selection coefficient”, s). 
                        </ArticleText>  
                        <ArticleText>
                            One of the earliest models by Haldane (1930) and Wright (1931) showed that if a single genetic locus affects the fit of an organism to its environment, local adaptation would only tend to evolve when the migration rate is lower than the selection coefficient (m {"<"} s). We could use this model to predict that if the migration rate from the lowlands up to the mountainside is 1%, then a new mutation that was better at tolerating the cold conditions of the mountainside would only establish if it increased the fitness there by {">"}1%. Of course, as this is a very simplified model of just a single genetic locus, it neglects important effects such as genetic drift and interactions with other loci, so there are many reasons why this prediction might not hold up in nature. To study some of these more complicated interactions, we can use evolutionary simulations to study how local adaptation is affected by different parameters of interest.
                        </ArticleText>

                        <Map />
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
                        <GenomeDescription />
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