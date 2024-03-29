import { useRef, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import ArticleHeader from '../../components/articleComponents/ArticleHeader';
import ArticleWrapper from '../../components/articleComponents/ArticleWrapper';
import ArticleBody from '../../components/articleComponents/ArticleBody'
import ArticleContent from '../../components/articleComponents/ArticleContent'
import ArticleAnimationBox from '../../components/articleComponents/ArticleAnimationBox';
import ArticleText  from '../../components/articleComponents/ArticleText';
import ArticleStickyAside from '../../components/articleComponents/ArticleStickyAside'
import ArticleSectionTitle from '../../components/articleComponents/ArticleSectionTitle';

import InfoModal from '../../components/widgets/InfoModal';
import usePopup from '../../hooks/usePopup';

// import StickyNavCushion from '../../components/pageComponents/StickyNavCushion';

import Map from './Map';
import Migration from './Migration';
import StabilizingSelectionDiagram from './StabilizingSelectionDiagram';
import GenomeDescription from './GenomeDescription'
import msTheme from './theme';

const StyledSpan = styled.span`
    color: ${({ theme }) => theme.spanColor};
    font-weight: 600;
    cursor: pointer;
`

const ActionButton = styled.span`
    color: ${({ theme }) => theme.spanColor};
    font-weight: 600;
    cursor: pointer;
    background: ${({ theme }) => theme.linkBackgroundColor};
    padding-right: 3px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    padding-left: 3px;
    border-bottom: 2px solid ${({ theme }) => theme.spanColor};
`



const MigrationSelectionBalance = () => {
    const articleRef = useRef()
    const migrationPopupRef = useRef()
    const selectionPopupRef = useRef()
    
    const [vizIndex, setVizIndex] = useState('')
    const [addLayer, setAddLayer] = useState(false);
    const [focusMap, setFocusMap] = useState(false);

    const handleAddLayer = () => {
        setVizIndex('map');
        setFocusMap(false)
        setAddLayer(prev => !prev)
    }

    const handleZoomIn = () => {
        setVizIndex('map')
        setAddLayer(false)
        setFocusMap(prev => !prev)
    }

    const [ popupMigration, setPopupMigration, handleOpenMigration ] = usePopup(false, articleRef)
    const [ popupSelection, setPopupSelection, handleOpenSelection ] = usePopup(false, articleRef)
 

    return (
        <ThemeProvider theme={msTheme}>
            {popupMigration && <InfoModal ref={migrationPopupRef} title="migration rate (m)" xAction={() => setPopupMigration(false)}><p>If a seed from a parent tree had a 1% chance of moving to the other patch, then this would be a migration rate of m = 0.01.</p></InfoModal>}
            {popupSelection && <InfoModal ref={selectionPopupRef} title="selection coefficient (s)" xAction={() => setPopupSelection(false)}><p>If a seed from a cold-adapted parent moved to a hot patch and competed with seeds adapted to the hot patch, then the difference in their fitness would be equal to s. So if the hot-adapted seeds make 10% more seeds than the cold-adapted seeds or have a 10% higher chance of surviving to maturity, then s = 0.1.</p></InfoModal>}

            <ArticleWrapper ref={articleRef}>
            
                
                <ArticleHeader title={"Migration Selection Balance"}/>
                <ArticleBody hasTOC={true}>
                    <ArticleContent>
                        <ArticleSectionTitle>The challenge of a variable environment</ArticleSectionTitle>
                        <ArticleText>
                            Many species inhabit spatially variable environments, where the conditions change from one place to another. For example, <ActionButton onClick={handleAddLayer}>the natural range</ActionButton> of lodgepole pine spans from the temperate climates of northern California up to the subarctic in the Yukon territory. How does one species manage to thrive in such different environments?
                        </ArticleText>
                        <ArticleText>
                            One evolutionary response to a variable environment is “local adaptation”, where different populations become genetically adapted to the conditions they commonly encounter where they live. This specialization arises by the gradual evolution of genetically-based differences in the traits that help the organism survive, grow, and produce seeds for the next generation. Trees grown from seeds collected in the Yukon territory will be more cold-tolerant, stop growing at an earlier date in the autumn, and grow more slowly than trees started from seeds collected in California. Local adaptation tends to involve constraints and trade-offs between traits, where it isn’t possible to optimise all traits at once. For lodgepole pine, the Yukon-adapted genotypes avoid autumn frost damage by stopping growth early and setting buds that are better able to tolerate cold temperatures in winter. But while this shorter growing season helps avoid frost damage, it also limits how much they can grow and compete. By contrast, the California genotypes grow much faster, but are more susceptible to frost damage and would die in the harsh northern winters. 
                        </ArticleText>

                        <ArticleSectionTitle>Why does local adaptation evolve?</ArticleSectionTitle>
                        <ArticleText>
                            Will local adaptation always evolve in response to a spatially variable environment? What if the environment varies over a small spatial scale? <ActionButton onClick={handleZoomIn}>Lodgepole pine inhabits valleys</ActionButton> where it grows on both the colder mountainsides and the warmer lowlands [link/pointer to picture]. Will the trees growing higher on the mountain evolve to be different than the trees in the lowlands? Or will all the trees adapt to the average conditions across both environments?
                        </ArticleText>
                        <ArticleText>
                            In lodgepole pine, dispersal happens through movement of the seeds and wind-blown pollen transport. If either seeds or pollen have a high chance of ending up in an environment that is not well suited to their genetically-determined traits, they will pay a fitness cost for being maladapted to the new conditions. Local adaptation will only emerge when the rate of dispersal between environments is not too high, relative to the fitness costs of being mismatched to the new environment. 
                        </ArticleText> 
                        <ArticleText>
                            Evolutionary theory provides a way to formally study these trade-offs by using simplified models where individuals can inhabit one of two places with different environments (e.g. a hot or cold climate, represented here by red and blue circles). There are two main parameters that affect evolution in this model: the rate at which offspring move and end up in a different patch than their parents (termed the <StyledSpan onClick={handleOpenMigration}>migration rate</StyledSpan>, m), and the effect of the difference between the two environments on an individual’s fitness (the <StyledSpan onClick={handleOpenSelection}>selection coefficient</StyledSpan>, s). 
                        </ArticleText>  
                        <ArticleText>
                            One of the earliest models by Haldane (1930) and Wright (1931) showed that if a single genetic locus affects the fit of an organism to its environment, local adaptation would only tend to evolve when the migration rate is lower than the selection coefficient (m {"<"} s). We could use this model to predict that if the migration rate from the lowlands up to the mountainside is 1%, then a new mutation that was better at tolerating the cold conditions of the mountainside would only establish if it increased the fitness there by {">"}1%. Of course, as this is a very simplified model of just a single genetic locus, it neglects important effects such as genetic drift and interactions with other loci, so there are many reasons why this prediction might not hold up in nature. To study some of these more complicated interactions, we can use evolutionary simulations to study how local adaptation is affected by different parameters of interest.
                        </ArticleText>
                        <ArticleSectionTitle>The two-patch model of local adaptation</ArticleSectionTitle>
                        <ArticleText>
                            The simulations we will study follow a scenario with two patches in different environments with equal migration rates between them. Individuals grow, reproduce, and potentially migrate to a different environment, with their probability of survival determined by their <ActionButton onClick={() => setVizIndex('stabilizing')}>fitness</ActionButton>. Individuals that match their environment better therefore have a higher chance of surviving and passing on their genotype to the next generation. Each individual’s phenotype is determined by a multi-locus genotype by adding up the effects of all mutations, which can either increase or decrease the value of the <ActionButton onClick={() => setVizIndex('description')}>phenotype</ActionButton>.

                        </ArticleText>
                        <Migration showDiagram={() => {}}/>
                        <ArticleText>
                            The simulations allow us to control various parameters of interest, such as:

                           <ul>
                               <li>The number of loci that affect a phenotype</li>
                               <li>The rate of new mutations per locus</li>
                               <li>The population size in each patch</li>
                               <li>The width of the fitness function, which controls the strength of natural selection</li>
                               <li>The migration rate between patches</li>
                               <li>The recombination rate between loci</li>
                           </ul>

                           Here, we will hold some of these factors constant and explore the effect of varying other parameters. How will changing these parameters affect how evolution works?
                        </ArticleText>
                        <ArticleSectionTitle>How do we study what happens in our simulations?</ArticleSectionTitle>
                        <ArticleText>
                            After the simulations run, we may want to observe various aspects of the evolutionary changes that have happened. 

                        </ArticleText>
                        
                    </ArticleContent>
                    <ArticleStickyAside>
                        {vizIndex === 'map' && <ArticleAnimationBox show={vizIndex === 'map'}>
                            <Map addLayer={addLayer}
                                focusMap={focusMap}
                                setAddLayer={setAddLayer}
                                setFocusMap={setFocusMap}
                            />
                        </ArticleAnimationBox>}
                        {vizIndex === 'stabilizing' && <ArticleAnimationBox show={vizIndex === 'stabilizing'}>
                            <StabilizingSelectionDiagram />
                        </ArticleAnimationBox>}
                        {vizIndex === 'description' && <ArticleAnimationBox show={vizIndex === 'description'}>
                            <GenomeDescription />
                        </ArticleAnimationBox>}
                        

                    </ArticleStickyAside>
                </ArticleBody>
            </ArticleWrapper>
        </ThemeProvider>
    )
}

export default MigrationSelectionBalance;