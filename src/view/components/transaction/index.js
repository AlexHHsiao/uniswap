import React, {useEffect, useContext, useState} from 'react';
import {getTransactions} from "../../../utils/api";
import {AppContext} from "../../../utils/context";
import {Table} from 'antd';
import {parseTransactionHelper, numUnitHelper, etherscanTxLocation, etherscanUserLocation, timeCal} from "../../../utils/helper";

// table columns data format
const columns = [
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: ({id, name}) => <a target="_blank" href={etherscanTxLocation(id)}>{name}</a>,
    },
    {
        title: 'Total Value',
        dataIndex: 'totalValue',
        key: 'totalValue',
        sorter: (a, b) => a.totalValue - b.totalValue,
        render: (val) => `$${numUnitHelper(val)}`,
    },
    {
        title: 'Token Amount',
        dataIndex: 'tokenAmount0',
        key: 'tokenAmount0',
        sorter: (a, b) => a.totalValue - b.totalValue,
        render: ({symbol, value}) => `${numUnitHelper(value)} ${symbol}`,
    },
    {
        title: 'Token Amount',
        dataIndex: 'tokenAmount1',
        key: 'tokenAmount1',
        sorter: (a, b) => a.totalValue - b.totalValue,
        render: ({symbol, value}) => `${numUnitHelper(value)} ${symbol}`,
    },
    {
        title: 'Account',
        dataIndex: 'account',
        key: 'account',
        render: (val) => <a target="_blank" href={etherscanUserLocation(val)}>{val}</a>,
    },
    {
        title: 'Time',
        dataIndex: 'timestamp',
        key: 'timestamp',
        sorter: (a, b) => a.timestamp - b.timestamp,
        render: (val) => timeCal(val),
    },
];

const Transaction = ({update}) => {
    const {setSpinnerLoading, setMessageData} = useContext(AppContext);
    const [transactionData, setTransactionData] = useState([]);

    const fetchTransactions = async () => {
        try {
            setSpinnerLoading(true);
            const response = await getTransactions();
            const {data: {transactions}} = await response.json();
            const parsedTransaction = parseTransactionHelper(transactions);
            setTransactionData(parsedTransaction);

            setSpinnerLoading(false);
            setMessageData({type: 'success', detail: 'Data has loaded!'});
        } catch (e) {
            setSpinnerLoading(false);
            setMessageData({type: 'error', detail: 'Something went wrong!'});
        }
    };

    // update will be triggerred from parent component and update the data
    useEffect(() => {
        fetchTransactions();
    }, [update]);

    return <Table columns={columns} dataSource={transactionData} />;
};

export default Transaction;