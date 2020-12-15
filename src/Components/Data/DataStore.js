import genomeData from './genome_data.json'
import genomeTemp from './genome_template.json'
import db from '../Dexie/indexeddb'
import Dexie from 'dexie'
import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'

var unique = []
var data = []
var genePos = genomeTemp.map(temp => temp.position);

function DataStore() {
    setData();
    Dexie.delete("PopVis"); //deletes existing database if there is one
    store();

    // if(newChanges()) {
    //     Dexie.delete("PopVis"); //deletes existing database if there is one
    //     store();
    // }
    return db;
}

function newChanges() {
    const hash = localStorage.getItem('hash');
    console.log(hash)

    if (hash === null || hash !== Base64.stringify(sha256(unique))) {
        localStorage.setItem('hash', Base64.stringify(sha256(unique)));
        return true;
    }
    return false;
}

async function setData() { 
    // TODO: Remove loop and store in a separate table (to clean file, hash to check if file already exists)
    for(var i = 0; i < genomeData.length; i++) { // only stores 1/5 of data
        if((i % 1 == 0) && (genomeData[i].effect_size_freq!= 0)) { //Removes duplicates and white points
            unique.push(genomeData[i]);
        }
    }

    for(var i = 0; i<unique.length; i++) { //Create objects to store in table
        var yIndex = genePos.findIndex(g => g === unique[i].position);

        data.push({
            x: (unique[i].output_gen)/1000,
            y: yIndex,
            esf: unique[i].effect_size_freq,
            m: unique[i].m,
            mu: unique[i].mu,
            r: unique[i].r,
            sigsqr: unique[i].sigsqr,
        });
    }
}

async function store() {
    db.coordinates.put(data).then(function(lastKey) {
    }).catch(Dexie.BulkError, function (e) {
        console.error (e);
    });
}

export default DataStore