import styled from 'styled-components';

const GlobalP = styled.div`
    float: right;
    margin-top: 5%;
    margin-right: 50px;
    width: 450px;
    height: 680px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 1px 10px 1px rgb(143, 143, 143);
    align-items: center;
`
const ParamName = styled.h2`
    font-family: 'Courier New', monospace;
    font-size: 19px;
    margin-left: 10px;
`
const Title = styled.h1`
    margin: 45px;
    font-family: 'Courier New', monospace;
    color: rgb(65, 95, 124);
    font-size: 30px;
`
const About = styled.p`
    margin-top: 3em;
    margin-left: 1em;
    margin-right: 1em;
    color: rgb(82, 82, 82);
    font-weight: 350;
    font-size: .9rem;
    text-align: justify;
`
const Param = styled.select`
    border-color: rgb(140, 171, 201);
    height: 30px;
    width: 95%;
    margin-left: 10px;
`

export default function Parameters(props) { // Handles user input for parameters and updates state of chart
    return (
        <GlobalP>
            <Title> Global Parameters </Title>
                <ParamName>Migration</ParamName>
                <Param onChange={(e) => props.onChange({...props.param, m: e.target.value})}>
                    <option value='0.001'>0.001</option>
                    <option value='0.0001'>0.0001</option>
                    <option value='0.00001'>0.00001</option>
                </Param>

                <ParamName>Mutation</ParamName>
                <Param onChange={(e) => props.onChange({...props.param, mu: e.target.value})}>
                    <option value='0.000001'>0.000001</option>
                </Param>

                <ParamName>Recombination</ParamName>
                <Param onChange={(e) => props.onChange({...props.param, r: e.target.value})}>
                    <option value='0.000001'>0.000001</option>
                </Param>

                <ParamName>Selection</ParamName>
                <Param onChange={(e) => props.onChange({...props.param, sigSqr: e.target.value})}>
                    <option value='25'>25</option>
                    <option value='5'>5</option>
                    <option value='2'>2</option>
                </Param>
                
            <div className="about-Container">
                <About> Results for a two-patch model of migration-selection balance. Migration rate indicates the proportion of individuals in each population that migrated from the other patch. Selection indicates the width of the fitness function (smaller values = stronger selection). Mutation indicates the rate per locus, per generation. Recombination indicates the rate between adjacent loci on a chromosome, per generation. </About>
            </div>
        </GlobalP>
    );
} 