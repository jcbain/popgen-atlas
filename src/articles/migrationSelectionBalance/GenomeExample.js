import styled from 'styled-components';

import useData from '../../hooks/useData';
import useParams from '../../hooks/useParams';
import useFilteredData from '../../hooks/useFilteredData';
import useTheme from '../../hooks/useTheme'
import GenomeChart from '../../components/charts/GenomeChart'


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

const GenomeExample = ({}) => {
    const { theme } = useTheme();
    const { data, loaded } = useData()
    const defaultSet = 'm0.0001_mu0.0000001_r0.00625_sigsqr25_n10000_pop1_alpha0.05'
    const { chosenSet } = useParams(data, defaultSet)
    const { genes, geneLoaded } = useFilteredData(data, loaded, 'effect_size_freq_diff', chosenSet)

    return (
        <Wrapper>
            <DrawingArea>
                {geneLoaded && <GenomeChart  data={genes} xVar={'output_gen'} yVar={'position'} colorVar={'effect_size_freq_diff'} cutoff={0.001} theme={theme} showBrush={false}/>}
            </DrawingArea>
        </Wrapper>
    )
}

export default GenomeExample