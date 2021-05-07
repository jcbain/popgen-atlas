import React from 'react'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";


const TabState = (props) => {
    const { handleChangeTab, handleAddTab, handleDeleteTab, value, tabList } = props

    return (
        <div>
            <Tabs 
                value={value} 
                onChange={handleChangeTab} 
                orientation="vertical"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="chart tabs"
            >
                { tabList.map(tab => (
                    <Tab
                        key={tab.key}
                        value={tab.id}
                        label={"D"+tab.key}
                        style={{ minWidth: "90%", background: 'white' }}
                        icon={<Close 
                            id={tab.id}
                            style={{ display: "inline-block", marginRight:"90%", fontSize: "1.5em"}}
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