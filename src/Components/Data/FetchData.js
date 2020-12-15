import DataStore from './DataStore';

async function FetchData() {
    const ar = await DataStore().coordinates.toArray(); //Table to array (DataStore returns db)

    setColor(ar)
    return ar[0];
}

function setColor(ar) { //***Should not be here: Put in clean file
    const numColor = 7; //6 colors to create gradient
    var min = 1;
    var max = 0;
    var range = 0;

    for(var gene of ar[0]) {
        if (gene.esf < min) {min = gene.esf} 
        else if (gene.esf > max) {max = gene.esf}
    }

    range = (max-min)/numColor;

    for(var gene of ar[0]) {
        if(gene.esf <= min+(range)) {gene.color = '#aa00ff'} //purple
        else if (gene.esf <= min+(2*range)) {gene.color = '#0000ff'} //blue
        else if (gene.esf <= min+(3*range)) {gene.color = '#4296f5'} //light blue
        else if (gene.esf <= min+(4*range)) {gene.color = '#42cbf5'} //light-er blue
        else if (gene.esf <= min+(5*range)) {gene.color = '#ffe100'} //yellow
        else if (gene.esf <= min+(6*range)) {gene.color = '#ff9500'} //orange
        else if (gene.esf <= max) {gene.color = '#ff0000'} //red
    }
}

export default FetchData 