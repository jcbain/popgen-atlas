import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';
import { textStyle } from './DashboardStyles'

const Param = styled.select`
    border-color: rgb(188, 188, 188);
    border-width: medium;
    height: 3%;
    width: 94%;
    margin-left: 1em;
`

function handleParamChange(param, property, value, index) {
    const tempArray = [...param];
    let newArray = { ...tempArray[index] };
    newArray[property] = value;
    tempArray[index] = newArray;
    
    return tempArray;
}

export default function Parameters(props) { // Handles user input for parameters and updates state of chart
    const params = props.param;
    const index = props.value;

    return (
        <ThemeProvider theme={textStyle}>
            <Typography variant="h1" gutterBottom> Global Parameters </Typography>
                <Typography variant="h2" gutterBottom> Migration </Typography>
                <Param onChange={(e) => props.onChange(handleParamChange(params, "m", e.target.value, index))}>
                    <option value='0.001'>0.001</option>
                    <option value='0.0001'>0.0001</option>
                    <option value='0.00001'>0.00001</option>
                </Param>

                <Typography variant="h2" gutterBottom> Mutation </Typography>
                <Param onChange={(e) => props.onChange(handleParamChange(params, "mu", e.target.value, index))}>
                    <option value='0.000001'>0.000001</option>
                </Param>

                <Typography variant="h2" gutterBottom> Recombination </Typography>
                <Param onChange={(e) => props.onChange(handleParamChange(params, "r", e.target.value, index))}>
                    <option value='0.000001'>0.000001</option>
                </Param>

                <Typography variant="h2" gutterBottom> Selection </Typography>
                <Param onChange={(e) => props.onChange(handleParamChange(params, "sigSqr", e.target.value, index))}>
                    <option value='25'>25</option>
                    <option value='5'>5</option>
                    <option value='2'>2</option>
                </Param>
                
            <Typography variant="body1" gutterBottom>
                Results for a two-patch model of migration-selection balance. Migration rate indicates the proportion of individuals in each population that migrated from the other patch. Selection indicates the width of the fitness function (smaller values = stronger selection). Mutation indicates the rate per locus, per generation. Recombination indicates the rate between adjacent loci on a chromosome, per generation.
            </Typography>
        </ThemeProvider>
    );
} 