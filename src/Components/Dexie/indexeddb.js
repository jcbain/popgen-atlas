import Dexie from 'dexie'

const db = new Dexie("PopVis"); //create new data

db.version(1).stores({
    coordinates: "++id"
});

export default db