import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import Button from '@material-ui/core/Button'

import Dashboard from './Dashboard';


const StyledDiv = styled.div`
    background-color: ${props => props.bcolor};
    padding: 0;
`;

const StyledBox = styled(Box)`
    &&{
        padding: 0;
    }
`;



function TabPanel(props) {
    const { children, value, index, bcolor, ...other } = props;

    return (
        <StyledDiv
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          bcolor={bcolor}
          {...other}
        >
          {value === index && (
            <StyledBox p={3}>
              {children}
            </StyledBox>
          )}
        </StyledDiv>
      );  
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

function a11yProps(index) {
return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
};
}

export default function SimpleTabs(props) {
    const [value, setValue] = React.useState(0);
    const [count, setCount] = useState(0)
    const initComponent = {
        selectedChart: {chartView: 'chartview', selectedChart: 'lineChartGroup'},
        params: {mu: '1e-6', m: '1e-4', r: '1e-6' , sigsqr: '25', output_gen: 1000, pop: 0},
        specialParams: {pop: {0: true, 1: true}}
    }
    const [dashboardState, setDashboardState] = useState({
        dashboard1: {
            component1: {...initComponent},
            component2: {...initComponent},
            component3: {...initComponent},
            component4: {...initComponent}
        },
        dashboard2: {
          component1: {...initComponent},
          component2: {...initComponent},
          component3: {...initComponent},
          component4: {...initComponent}
      }
    })

    const xAction = (dashboardKey) => (componentKey) => () => {
      setDashboardState(prevState => ({
        ...prevState, 
        [dashboardKey] : {
          ...prevState[dashboardKey], 
          [componentKey] : {
            ...prevState[dashboardKey][componentKey],
            selectedChart : {
              ...prevState[dashboardKey][componentKey]['selectedChart'],
              chartView: 'chartlister', selectedChart: ''
          }
          }
        }
      })
      )
    }

    const chooseChart = (dashboardKey) => componentKey => (chartId) => () => {
      setDashboardState(prevState => ({
        ...prevState, 
        [dashboardKey] : {
          ...prevState[dashboardKey],
          [componentKey] : {
            ...prevState[dashboardKey][componentKey],
            selectedChart : {
              ...prevState[dashboardKey][componentKey]['selectedChart'],
              chartView: 'chartoptions', selectedChart: chartId
            }
          }
        }
      }))
    }
   
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={'something'}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel bcolor={'#fff'} value={value} index={0}>
          <Button onClick={() => console.log(dashboardState)}>Check State</Button>
            <Dashboard className={'dashboard-local-adaptation'}
                   data={props.data} 
                   dataDiff={props.dataDiff}
                   dataPopPhen={props.dataPopPhen} 
                   dataPopPhenDiff={props.dataPopPhenDiff}
                   template={props.template}
                   params={props.params}
                   dashboardState={dashboardState.dashboard1}
                   xAction={xAction('dashboard1')}
                   chooseChart={chooseChart('dashboard1')}>
            </Dashboard>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Dashboard className={'dashboard-local-adaptation'}
                 data={props.data} 
                 dataDiff={props.dataDiff}
                 dataPopPhen={props.dataPopPhen} 
                 dataPopPhenDiff={props.dataPopPhenDiff}
                 template={props.template}
                 params={props.params}
                 dashboardState={dashboardState.dashboard2}
                 xAction={xAction('dashboard2')}
                 chooseChart={chooseChart('dashboard2')}>
            </Dashboard>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <Dashboard className={'dashboard-local-adaptation'}
                data={props.data} 
                dataDiff={props.dataDiff}
                dataPopPhen={props.dataPopPhen} 
                dataPopPhenDiff={props.dataPopPhenDiff}
                template={props.template}
                params={props.params}
                xAction={xAction('dashboard3')}>
            </Dashboard>
        </TabPanel>
      </div>
    );
  }

