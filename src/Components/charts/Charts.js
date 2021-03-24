import Grid from "@material-ui/core/Grid";
import { filterParams, lineChartData, histogramData } from './DataFilter'
import LineChart from './LineChartParent';
import GenomeArch from './GenomeArchParent';
import DisplayView from './GenomeArchChild';
import LineView from './LineChartChild';
import HistoSlider from './HistoSlider';
import Histogram from './Histogram';

export default function Charts(props) {
    const { data,
            uniqueX,
            param,
            value} = props;

    return (
        <Grid item xs container direction="column">
        <Grid item xs={12}>
            <Grid item xs container direction="column" spacing={2}>
                <Grid item xs container direction="row" spacing={2}>
                    <Grid item xs={6}>
                        <LineChart filteredData={lineChartData(data, uniqueX, param[value])}>
                            {selection => <LineView
                                                filteredData={lineChartData(data, uniqueX, param[value])}
                                                selection={selection}/>
                            }
                        </LineChart>
                    </Grid>

                    <Grid item xs={6}>
                        <GenomeArch filteredData={filterParams(data, param[value])}>
                            {selection => <DisplayView
                                                filteredData={filterParams(data, param[value])}
                                                selection={selection}/>
                            }
                        </GenomeArch>
                    </Grid>
                </Grid>

                <Grid item xs container direction="row" spacing={2}>
                    <Grid item xs={6}>
                        <HistoSlider>
                            {selection => <Histogram
                                                filteredData={histogramData(data, param[value], selection)}
                                            />
                            }
                        </HistoSlider>
                    </Grid>

                    <Grid item xs={6}>
                        <HistoSlider>
                            {selection => <Histogram
                                                filteredData={histogramData(data, param[value], selection)}
                                            />
                            }
                        </HistoSlider>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    )
}