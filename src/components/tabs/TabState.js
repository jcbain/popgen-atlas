  
import React from 'react'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";


const TabState = (props) => {
    const {handleChangeTab,handleAddTab,handleDeleteTab,value,tabList} = props

    return (
        <div>
            <Tabs 
                value={value} 
                onChange={handleChangeTab} 
                orientation="vertical"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="chart tabs"
                style={{width: "100px"}}
            >
                { tabList.map(tab => (
                    <Tab
                        key={tab.key}
                        value={tab.id}
                        label={"D"+tab.key}
                        icon={<Close 
                            id={tab.id} 
                            style={{ display: "inline-block", marginLeft:"-100px", fontSize: "20px", gridArea: "tab"}} 
                            onClick={handleDeleteTab}/>}
                        className="mytab"
                    />
                ))}

                <Button onClick={handleAddTab}>
                    <AddIcon/>
                </Button>
            </Tabs>
        </div>
    )
}

export default TabState;