import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';

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
        <TabPanel bcolor={'#000'} value={value} index={0}>
            <Dashboard className={'dashboard-local-adaptation'}
                   data={props.data} 
                   dataDiff={props.dataDiff}
                   dataPopPhen={props.dataPopPhen} 
                   dataPopPhenDiff={props.dataPopPhenDiff}
                   template={props.template}
                   params={props.params}>
            </Dashboard>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Dashboard className={'dashboard-local-adaptation'}
                 data={props.data} 
                 dataDiff={props.dataDiff}
                 dataPopPhen={props.dataPopPhen} 
                 dataPopPhenDiff={props.dataPopPhenDiff}
                 template={props.template}
                 params={props.params}>
            </Dashboard>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <Dashboard className={'dashboard-local-adaptation'}
                data={props.data} 
                dataDiff={props.dataDiff}
                dataPopPhen={props.dataPopPhen} 
                dataPopPhenDiff={props.dataPopPhenDiff}
                template={props.template}
                params={props.params}>
            </Dashboard>
        </TabPanel>
      </div>
    );
  }

