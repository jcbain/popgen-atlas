import React, { useEffect, useState } from 'react';
import FetchData from '../data/FetchData';
import Parameters from './Parameters';
import Charts from '../charts/Charts';
import SwitchState from './SwitchState';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add"; 
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import { dashboardStyle } from './DashboardStyles'

const useStyles = makeStyles((dashboardStyle));

const defaultParam = {
    m: 0.001,
    mu: 0.000001,
    r: 0.000001,
    sigSqr: 25
}

const TabsData = [
    {
        tabTitle: 'D1',
        tabParam: 0
    }
];

export default function MainDashboard() {
    const styles = useStyles();
    const [value, setValue] = useState(0);
    const [newTab, setNewTab] = useState(1);
    const [data, setData] = useState ([]);
    const [uniqueX, setUniqueX] = useState ([]);
    const [staticData, setStaticData] = useState(false);
    const [param, setParam] = useState([defaultParam]);

    useEffect(() => {
        FetchData().then(result => (
            setData(result.geneData),
            setUniqueX(result.uX)
        ))
    }, [])

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const handleAddTab = () => {
        setNewTab(TabsData.length+1);
        setParam(param => [...param, defaultParam]);
        
        TabsData.push({
            tabTitle: "D" + `${TabsData.length+1}`,
            tabParam: TabsData.length
        });
    };

    return (
        <Grid container className={styles.root}>
            <Grid item xs={12} className={styles.tabGrid}>
                <AppBar position="static" className={styles.appBar}>
                    <Tabs value={value} onChange={handleChangeTab} aria-label="chart tabs">

                        {TabsData.map((tabInfo) => (
                            <Tab
                                label={tabInfo.tabTitle}
                                key={tabInfo.tabParam}
                            /> 
                        ))}

                        <Button className={styles.addButton} onClick={handleAddTab}>
                            <AddIcon/>
                        </Button>
                    </Tabs>
                </AppBar>
            </Grid>

            <Grid item xs={12} container>
                <Charts 
                    data={data}
                    uniqueX={uniqueX}
                    param={param}
                    value={value}
                />

                <Grid item xs={2}>
                    <div className={styles.parameters}>
                        <SwitchState
                            onChange={s => setStaticData(s)}
                            staticData={staticData}
                        />

                        <Parameters
                            onChange={filtered => setParam(filtered)}
                            param={param}
                            value={value}
                        />
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}
