import { useState } from 'react';
import Parameters from '../ParamDropDown/Parameters'
import DisplayChart from './DisplayChart'
import './Chart.css'
import ChartState from './ChartState';
import LineChart from './LineChart';
import Histogram from './Histogram';

//Filters data to be plotted on all graphs
export default function Chart(props) {
    var data = Object.values(props.chartData);

    const[param, setParam] = useState({
        m: "",
        mu: "",
        r: "",
        sigSqr: ""
    });

    function filterParams() {
        return data.filter(gene =>
            ((gene.m == param.m || param.m == "")&&
            (gene.mu == param.mu || param.mu == "")&&
            (gene.r == param.r || param.r == "")&&
            (gene.sigsqr == param.sigSqr || param.sigSqr == ""))
        );
    }

    return (
        <div>
            <div className="Main">
                <div className="param-select">
                    <Parameters onChange={filtered => setParam(filtered)} param={param}/>
                </div>

                <div className="wrapper-chart">
                    <DisplayChart filter={filterParams()}/>
                    <Histogram filter={filterParams()}/>
                    <LineChart filter={filterParams()}/>
                    <Histogram filter={filterParams()}/>
                </div>
            </div>
        </div>
    )
}