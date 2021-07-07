import styled from 'styled-components';

import useData from '../../hooks/useData';
import useParams from '../../hooks/useParams';
import useFilteredData from '../../hooks/useFilteredData';
import useTheme from '../../hooks/useTheme'
import Line from '../../components/charts/LineChart/Line'


const Wrapper = styled.div`
    width: calc(100% - 40px);
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
    padding: 40px 10px 0px 10px;
    
`

const AveragePhenotype = ({}) => {
    const { theme } = useTheme();
    const { data, loaded } = useData()
    const defaultSet = 'm0.0001_mu0.0000001_r0.00625_sigsqr25_n10000_pop1_alpha0.05'
    const { chosenSet } = useParams(data, defaultSet)
    const { phens, phenLoaded } = useFilteredData(data, loaded, 'effect_size_freq_diff', chosenSet)
    return (
        <Wrapper>
            <DrawingArea>
                {phenLoaded && <Line data={phens} xVar={'output_gen'} yVar={'phen_diff'} theme={theme} upperLimit={250000} lowerLimit={2000}/>}
            </DrawingArea>
        </Wrapper>
    )
}

export default AveragePhenotype;

