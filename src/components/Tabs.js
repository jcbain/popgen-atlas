import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import Button from '@material-ui/core/Button'

import Dashboard from './Dashboard';
import { getAllByDisplayValue } from '@testing-library/react';
import { values } from 'lodash';


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

const TabPanelContainer = styled.div`
  background-color: #fff;
  width: 100%;
  height: 95vh;
`

export const AddTabs = (props) => {
  const [value, setValue] = useState(0);
  const [isStatic, setIsStatic] = useState(false);
  const [buttonVal, setButtonVal] = useState({0: 0})
  const [numTabs, setNumTabs] = useState(1);
  const initComponent = {
    selectedChart: {chartView: 'chartview', selectedChart: 'lineChartGroup'},
    params: {mu: '1e-6', m: '1e-4', r: '1e-6' , sigsqr: '25', output_gen: 1000, pop: 0},
    specialParamOpts: {pop: {0: true, 1: true}}
  }
  const [dashboardState, setDashboardState] = useState({
    0: {
      component1: {...initComponent},
      component2: {...initComponent},
      component3: {...initComponent},
      component4: {...initComponent}
    }
  })

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addNewTab = () => {
    setNumTabs(numTabs + 1)
    setDashboardState(prevState => ({
      ...prevState,
      [numTabs]: dashboardState[value]
    }))
  }


  const xAction = componentKey => () => {
    setDashboardState(prevState => ({
      ...prevState, [value] : {
        ...prevState[value], [componentKey] : {
          ...prevState[value][componentKey], selectedChart : {
            ...prevState[value][componentKey]['selectedChart'], chartView: 'chartlister', selectedChart: ''
          }
        }
      }
    })
    )
  }

  const chooseChart = componentKey => chartId => () => {
    setDashboardState(prevState => ({
      ...prevState, [value] : {
        ...prevState[value], [componentKey] : {
          ...prevState[value][componentKey], selectedChart : {
            ...prevState[value][componentKey]['selectedChart'], chartView: 'chartoptions', selectedChart: chartId
          }
        }
      }
    }))
  }

  const renderChart = componentKey => () => {
    setDashboardState(prevState => ({
      ...prevState, [value] : {
        ...prevState[value], [componentKey] : {
          ...prevState[value][componentKey], selectedChart : {
            ...prevState[value][componentKey]['selectedChart'], chartView: 'chartview'
          }
        }
      }
    }))
  }

  const changeParamOption = componentKey => (name, val) => {
    setDashboardState(prevState => ({
      ...prevState, [value] : {
        ...prevState[value], [componentKey] : {
          ...prevState[value][componentKey], params : {
            ...prevState[value][componentKey]['params'],[name] : val
          }
        }}
    }))
  }

  const getSpecialParamOpts = componentKey => (name, option, val) => {
    setDashboardState(prevState => ({
      ...prevState, [value] : {
        ...prevState[value], [componentKey] : {
          ...prevState[value][componentKey], specialParamOpts : {
            ...prevState[value][componentKey]['specialParamOpts'], [name] : {
              ...prevState[value][componentKey]['specialParamOpts'][name], [option]: !val
            }
          }
        }}
    }))
  }

  

  const tabs = [...Array(numTabs)].map((t, i) => {
    return (
      <Tab key={i} label={`Just a Tab ${i}`} {...a11yProps(i)} ></Tab>
    )
  })

  const tabpanels = [...Array(numTabs)].map((t, i) => {
    return (
      <TabPanel key={i} value={value} index={i} >
        <TabPanelContainer>
          {/* <Button onClick={pressButton}>Click Me To Add 1</Button>
          <Button onClick={pressButtonMinus}>Click Me To Subtract 1</Button>
          <p>{buttonVal[i]}</p> */}
          <Dashboard className={'dashboard-local-adaptation'}
                   isStatic={isStatic}
                   data={props.data} 
                   dataDiff={props.dataDiff}
                   dataPopPhen={props.dataPopPhen} 
                   dataPopPhenDiff={props.dataPopPhenDiff}
                   template={props.template}
                   params={props.params}
                   dashboardState={dashboardState[i]}
                   xAction={xAction}
                   chooseChart={chooseChart}
                   renderChart={renderChart}
                   changeParamOption={changeParamOption}
                   getSpecialParamOpts={getSpecialParamOpts}>
            </Dashboard>
        </TabPanelContainer>
      </TabPanel>
    )
  })

  return (
    <div className='tabbar-container'>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          {tabs}
          <Tab icon={<AddIcon></AddIcon>} onClick={addNewTab} disabled={numTabs === props.maxNumTabs ? true : false}></Tab>
        </Tabs>
      </AppBar>
      {tabpanels}
    </div>
  )
}


