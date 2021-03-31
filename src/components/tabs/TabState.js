  
import React from 'react'
import {useEffect, useState} from 'react'

import Dashboard from '../dashboards/Dashboard'

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";


const TabState = () => {
    const [value, setValue] = useState(0);
    const [tabList, setTabList] = useState([{
        key: 0,
        id: 0
    }]);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    }

    const handleAddTab = () => {
        let maxTab = 4;
        if (tabList.length <= maxTab) {
            let id = tabList[tabList.length - 1].id + 1;
            setTabList([...tabList, { key: id, id: id }]);
        }
    }

    const handleDeleteTab = e => {
        e.stopPropagation();

        if (tabList.length === 1) {
            return;
        }
        let tabId = parseInt(e.target.id);
        let tabIDIndex = 0;
      
        let tabs = tabList.filter((value, index) => {
            if (value.id === tabId) {
                tabIDIndex = index;
            }
                return value.id !== tabId;
        });
      
        let curValue = parseInt(value);
        if (curValue === tabId) {
            if (tabIDIndex === 0) {
              curValue = tabList[tabIDIndex + 1].id;
            } else {
              curValue = tabList[tabIDIndex - 1].id;
            }
        }
        setValue(curValue);
        setTabList(tabs);
    };

    return (
        <div>
            <Tabs 
                value={value} 
                onChange={handleChangeTab} 
                variant="scrollable" 
                scrollButtons="auto" 
                aria-label="chart tabs"
            >
                {tabList.map(tab => (
                    <Tab
                        key={tab.key.toString()}
                        value={tab.id}
                        label={"D" + tab.id}
                        icon={<Close 
                            id={tab.id} 
                            style={{ display: "inline-block", marginLeft:"100px", fontSize: "15px"}} 
                            onClick={handleDeleteTab}/>}
                        className="mytab"
                    />
                ))}

                <Button onClick={handleAddTab}>
                    <AddIcon/>
                </Button>
            </Tabs>
            {/* {tabList.map((t,i) => (
                <TabPanel
                    value={t.id}
                    index={i}
                >
                    <Dashboard/>
                </TabPanel>
            ))} */}
        </div>
    )

}

const TabPanel = (props) => {
    const { children, value, index } = props;

    return (
        <div hidden={value !== index}>
            {value === index && (
                <div>{children}</div>
            )}
        </div>
    )
}

export default TabState;