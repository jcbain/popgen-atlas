import './Parameter.css'
import Switch from "react-switch";

export default function Parameters(props) {

    return (
        <div className="Global-Params">
            <h1> Global Parameters </h1>

                <h2>Migration</h2>
                <select className="param" onChange={(e) => props.onChange({...props.param, m: e.target.value})}>
                    <option value="">All Values</option>
                    <option value='0.001'>0.001</option>
                    <option value='0.0001'>0.0001</option>
                    <option value='0.00001'>0.00001</option>
                </select>

                <h2>Mutation</h2>
                <select className="param" onChange={(e) => props.onChange({...props.param, mu: e.target.value})}>
                    <option value="">All Values</option>
                    <option value='0.000001'>0.000001</option>
                </select>

                <h2>Recombination</h2>
                <select className="param" onChange={(e) => props.onChange({...props.param, r: e.target.value})}>
                    <option value="">All Values</option>
                    <option value='0.000001'>0.000001</option>
                </select>

                <h2>Selection</h2>
                <select className="param" onChange={(e) => props.onChange({...props.param, sigSqr: e.target.value})}>
                    <option value="">All Values</option>
                    <option value='2'>2</option>
                    <option value='5'>5</option>
                    <option value='25'>25</option>
                </select>
                
            <div className="about-Container">
                <p> Results for a two-patch model of migration-selection balance. Migration rate indicates the proportion of individuals in each population that migrated from the other patch. Selection indicates the width of the fitness function (smaller values = stronger selection). Mutation indicates the rate per locus, per generation. Recombination indicates the rate between adjacent loci on a chromosome, per generation. </p>
            </div>
        </div>
    );
} 