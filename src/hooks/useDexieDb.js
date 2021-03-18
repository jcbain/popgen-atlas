import { useEffect, useState } from 'react'; 
import Dexie from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import genes from '../data/genome_data.json'

console.log(Object.keys(genes[0]))

const cols = Object.keys(genes[0]).join(", ")
console.log(cols)

const useDexieDb = () => {
    const [data, setData] = useState([])
    const [isDbSeeded, setIsDbSeeded] = useState(false)
    const [loaded, setLoaded] = useState(false)

    const db = new Dexie("popvisDb");

    db.version(1).stores({
        mutations: `++id, ${cols}`
    });

    useEffect(() => {
       Dexie.delete('popvisDb') 
    }, [])
    
    useEffect(() => {
        db.mutations.bulkAdd(genes)
            .then(() => setIsDbSeeded(true))
            .catch(err => console.error(err))
    }, [])

    // useEffect(() => {
    //     db.coordinates.toArray()
    //         .then(res => {
    //             // console.log(res)
    //             // setData(res[0].geneData)
    //             setLoaded(true)
    //         })
    // }, [])

    const queryPop = (pop) => {
        db.mutations.where('pop').equals(pop).toArray()
            .then(res => setData(res))
    }



    return { data, loaded, queryPop }
}

export default useDexieDb;