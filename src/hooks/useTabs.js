import {useEffect, useState} from 'react'

const useTabs = (genes,phens,paramOptions) => {
    const maxTab = 4;
    const [value, setValue] = useState(0);
    const tabProperties = {
        geneData: genes,
        phenData: phens,
        parameter: paramOptions
    };
    const [tabList, setTabList] = useState([{
        key: 1,
        id: 0
    }]);

    const [tabData, setTabData] = useState([tabProperties]);

    useEffect(() => {
        let tempTabData = [...tabData];
        let newTabData = [tempTabData[value]];

        newTabData.geneData = genes;
        newTabData.phenData = phens;
        newTabData.parameter = paramOptions;

        tempTabData[value] = newTabData;
        setTabData(tempTabData);

    }, [genes, phens, paramOptions]);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    }

    const handleAddTab = () => {
        let id = tabList[tabList.length - 1].id + 1;
        const newTab =  {
            key: id+1,
            id: id
        }

        if (tabList.length <= maxTab) {
            setTabList([ ...tabList, newTab ]);
            setTabData([ ...tabData, tabProperties ]);
        }
    }

    const handleDeleteTab = (e) => {
        let curValue = value;
        let tabId = parseInt(e.target.id);
        e.stopPropagation();
        
        if (tabList.length !== 1 && tabId >= 0) {
            let newTabData = tabData.filter((prop, index) => (tabId !== index));
            let tabs = tabList.filter((value) => value.id !== tabId);

            tabs.map((tab) => {
                let val = ((tab.id > tabId) ? 1 : 0);

                tab.id = tab.id-val;
                tab.key = tab.key-val;
            });

            if (curValue > 0) {
                curValue--;
            }

            setValue(curValue);
            setTabData(newTabData);
            setTabList(tabs);
        }
    };

    return {
        handleChangeTab,
        handleAddTab,
        handleDeleteTab,
        value,
        tabData,
        tabList
    }
}

export default useTabs;