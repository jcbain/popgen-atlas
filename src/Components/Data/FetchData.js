/* =============================================================================
    @TODO: Make hash for genomeTemp, if possible, combine code with genomeData?
    
    Returns data stored in indexedDB. If hashcode of json files are different
    from the code stored in localstorage, CreateStore is called, which
    cleans file and stores clean data in dexie.
============================================================================= */

import genomeData from './genome_data.json'
import genomeTemp from './genome_template.json'
import db from '../Dexie/indexeddb'
import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'
import CreateStore from '../Dexie/CreateStore'

export default async function FetchData() {
    if(newChanges()) {
        CreateStore(); // Creates dexie tables if Json file is different
    }

    const ar = await db.coordinates.toArray(); // Table stored in dexie
    return ar[0];
}

function newChanges() {
    const hash = localStorage.getItem('hash'); // Hashcode for json file saved in localstorage
    const newH = Base64.stringify(sha256(JSON.stringify(genomeData))) // Json file hashcode

    if (hash === null || hash !== newH) {
        localStorage.setItem('hash', newH);
        return true;
    }

    return false;
}
