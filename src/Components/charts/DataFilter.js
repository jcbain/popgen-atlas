import * as d3 from 'd3'

export function filterParams(data, param) {
    return data.filter(gene =>
        ((gene.m == param.m || param.m == "") &&
        (gene.mu == param.mu || param.mu == "") &&
        (gene.r == param.r || param.r == "") &&
        (gene.sigsqr == param.sigSqr || param.sigSqr == ""))
    );
}

export function lineChartData(data, uniqueX, param) {
    const points = []
    const filt = filterParams(data, param)

    uniqueX.forEach((elem) => { // Loop through list of unique X coords
        const arr = filt.filter(e => (e.x == elem)) // Filter gene data by X coords

        if (arr.length > 0) { // Avoid error
            const average = d3.mean(arr, d => d.freq);  
            points.push({ // Create points to be plotted on line graph
                x: elem,
                y: average
            })
        }
    })
    return points;
}

export function histogramData(data, param, selection) {
    const points  = [];
    const filter = filterParams(data, param)
    const generation = filter.filter(d => d.x == selection);
    const histo = d3.bin()
                    .value(d => d.esf);
  
    histo(generation).forEach((bin) => {
        points.push({
            x: bin.x0,
            y: bin.length
        });
    });
  
    return points;
}

export default { filterParams, lineChartData, histogramData }