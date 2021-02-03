/* ==============================================================
    File will run if genome_data.json or genome_template.json
    changes or it's hashcode isn't saved in localstorage.

    Otherwise, data saved in indexedDB is used to plot charts.
============================================================== */

import genomeData from '../Data/genome_data.json'
import genomeTemp from '../Data/genome_template.json'
import db from './indexeddb'
import Dexie from 'dexie'

var unique = [] 
var temp = [] // x value used in line chuniquet and genome uniquech
var uniq_x = []
var data = [] // Saves all gene info (geneData in indexedDB)
var genePos = genomeTemp.map(temp => temp.position);

export default function CreateStore() {
    getUniqueData(); // Remove duplicate stats in genome_data
    setData(); // Sets useful data to be stored in Dexie
    setColor(); // Sets color for color gradient used in Genome Arch
    Dexie.delete("PopVis"); // Deletes existing database if there is one
    store(); // Stores clean/sorted data to dexie table
}

function getUniqueData() {
    for(var i = 0; i < genomeData.length; i++) {
        if((i % 2 == 0) && (genomeData[i].effect_size_freq != 0)) { //Removes duplicates and white points
            unique.push(genomeData[i]);
        }
    }
}

async function setData() { 
    for(var i = 0; i<unique.length; i++) { // Create objects to store in table
        const yIndex = genePos.findIndex(g => g === unique[i].position);

        data.push({ // Stores all data needed for puniqueameters and plots
            x: (unique[i].output_gen),
            y: yIndex,
            esf: unique[i].effect_size_freq,
            m: unique[i].m,
            mu: unique[i].mu,
            r: unique[i].r,
            freq: unique[i].freq,
            sigsqr: unique[i].sigsqr,
        });

        if( temp[data[i].x]) continue; // Stores unique output_gen (Removes duplicate output_gen)
        temp[data[i].x] = true; 
        uniq_x.push(data[i].x);
    }

    uniq_x.sort(function(a, b) { // Sort completed data by output_gen value
        return a-b
    })
}

function setColor() { // Sets color gradient for each gene, change code using https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Gradients
    const numColor = 7; //6 colors to create gradient
    const max = Math.max(...data.map(e => e.esf)); // Max output_gen in data
    const min = Math.min(...data.map(e => e.esf)); // Max y avergae to graph
    const range = (max-min)/numColor;

    data.forEach(function (gene) {
        if(gene.esf <= min+(range)) {gene.color = '#aa00ff'} //purple
        else if (gene.esf <= min+(2*range)) {gene.color = '#0000ff'} //blue
        else if (gene.esf <= min+(3*range)) {gene.color = '#4296f5'} //light blue
        else if (gene.esf <= min+(4*range)) {gene.color = '#42cbf5'} //light-er blue
        else if (gene.esf <= min+(5*range)) {gene.color = '#ffe100'} //yellow
        else if (gene.esf <= min+(6*range)) {gene.color = '#ff9500'} //orange
        else if (gene.esf <= max) {gene.color = '#ff0000'} //red
    });
}

async function store() {
    db.coordinates.put({geneData: data, uX: uniq_x}).then(function(lastKey) {
    }).catch(Dexie.BulkError, function (e) {
        console.error (e);
    });
}
