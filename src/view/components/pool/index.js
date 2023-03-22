import React, {useEffect, useContext, useState} from 'react';
import {getPools} from "../../../utils/api";
import {AppContext} from "../../../utils/context";
import {Table} from 'antd';
import {parsePoolHelper, numUnitHelper} from "../../../utils/helper";

// table columns data format
const columns = [
    {
        title: 'Pool',
        dataIndex: 'pool',
        key: 'pool',
    },
    {
        title: 'TVL',
        dataIndex: 'TVL',
        key: 'TVL',
        sorter: (a, b) => a.TVL - b.TVL,
        render: (val) => `$${numUnitHelper(val)}`,
    },
    {
        title: 'Volume 24H',
        dataIndex: 'volumeUSD',
        key: 'volumeUSD',
        sorter: (a, b) => a.price - b.price,
        render: (val) => `$${numUnitHelper(val)}`,
    },
];

const Pool = ({update}) => {
    const {setSpinnerLoading, setMessageData} = useContext(AppContext);
    const [poolData, setPoolData] = useState([]);

    const fetchPools = async () => {
        try {
            setSpinnerLoading(true);
            const response = await getPools();
            const {data: {pools}} = await response.json();
            const parsedPool = parsePoolHelper(pools);
            setPoolData(parsedPool);

            setSpinnerLoading(false);
            setMessageData({type: 'success', detail: 'Data has loaded!'});
        } catch (e) {
            setSpinnerLoading(false);
            setMessageData({type: 'error', detail: 'Something went wrong!'});
        }
    };

    // update will be triggerred from parent component and update the data
    useEffect(() => {
        fetchPools();
    }, [update]);

    return <Table columns={columns} dataSource={poolData} />;
};

export default Pool;