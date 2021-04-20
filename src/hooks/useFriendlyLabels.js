import { useState } from 'react';

const friendlyDefault = {
    effect_size_freq_diff: 'locus effect size',
    phen_diff: 'mean phenotypic divergence',
    m: 'migration',
    mu: 'mutation',
    r: 'recombination',
    sigsqr: 'selection',
    alpha: 'alpha',
    output_gen: 'generation',
    n: 'population size',
    pop: 'population'
}

const useFriendlyLabels = () => {
    const [ friendlyLabels, useFriendlyLabels ] = useState(friendlyDefault)

    return { friendlyLabels }
}

export default useFriendlyLabels;