import { useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames'

import useData from '../../hooks/useData';
import useParams from '../../hooks/useParams';
import useFilteredData from '../../hooks/useFilteredData';
import useTheme from '../../hooks/useTheme'
import GenomeChart from '../../components/charts/GenomeChart'
import Line from '../../components/charts/LineChart/Line'
import FunButton from '../../components/buttons/FunButton'




const Wrapper = styled.div`
    width: calc(100% - 60px);
    height: 360px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 80px;
    
`

const DrawingArea = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: 2px solid;
    padding: 20px 20px 20px 20px;
    
`

const ButtonBar = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    & > button {
        margin-right: 10px;
    }
`

const GenePhen = ({set}) => {
    const [isGene, setIsGene] = useState(false)

    const { theme } = useTheme();
    const { data, loaded } = useData()
    console.log(set)
    // const defaultSet = 'm0.0001_mu0.0000001_r0.00625_sigsqr25_n10000_pop1_alpha0.05'
    const { chosenSet } = useParams(data, set)
    console.log('chosen set', chosenSet)

    const { genes, geneLoaded, phens, phenLoaded } = useFilteredData(data, loaded, 'effect_size_freq_diff', chosenSet)
    console.log(phens)

    return (
        <Wrapper>
            <DrawingArea>
                {(geneLoaded && isGene) && <GenomeChart  data={genes} xVar={'output_gen'} yVar={'position'} colorVar={'effect_size_freq_diff'} cutoff={0.001} theme={theme} showBrush={false}/>}
                {(phenLoaded && !isGene) && <Line data={phens} xVar={'output_gen'} yVar={'phen_diff'} theme={theme} upperLimit={250000} lowerLimit={2000} yMaxOverride={2.5} yMinOverride={-0.5}/>}
            </DrawingArea>
            <ButtonBar>
                <FunButton className={classNames({'not-triggered': isGene, 'triggered': !isGene})} onClick={() => setIsGene(prev => !prev)}>
                    Average Phenotype
                </FunButton>
                <FunButton className={classNames({'not-triggered': !isGene, 'triggered': isGene})} onClick={() => setIsGene(prev => !prev)}>
                    Genome
                </FunButton>

            </ButtonBar>
        </Wrapper>
    )
}

export default GenePhen