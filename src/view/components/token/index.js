import React, {useEffect, useContext, useState} from 'react';
import {getTokens} from "../../../utils/api";
import {AppContext} from "../../../utils/context";
import {Table, Tag} from 'antd';
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons';
import {parseTokenHelper, numUnitHelper} from "../../../utils/helper";

// table columns data format
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: ({name, symbol}) => `${name} (${symbol})`,
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        sorter: (a, b) => a.price - b.price,
        render: (val) => `$${val}`,
    },
    {
        title: 'Price Change',
        dataIndex: 'priceChange',
        key: 'priceChange',
        sorter: (a, b) => a.priceChange - b.priceChange,
        render: (val) => {
            val = val.toFixed(2);
            if (val < 0) {
                return (
                    <Tag icon={<ArrowDownOutlined/>} color='volcano'>
                        {val}%
                    </Tag>
                );
            } else if (val > 0) {
                return (
                    <Tag icon={<ArrowUpOutlined/>} color='green'>
                        {val}%
                    </Tag>
                );
            } else {
                return (
                    <Tag color='green'>
                        0.00%
                    </Tag>
                );
            }
        },
    },
    {
        title: 'TVL',
        dataIndex: 'TVL',
        key: 'TVL',
        sorter: (a, b) => a.TVL - b.TVL,
        render: (val) => `$${numUnitHelper(val)}`,
    },
];

const Token = ({update}) => {
    const {setSpinnerLoading, setMessageData} = useContext(AppContext);
    const [tokenData, setTokenData] = useState([]);

    const fetchTokens = async () => {
        try {
            setSpinnerLoading(true);
            const response = await getTokens();
            const {data: {tokens}} = await response.json();
            const parsedToken = parseTokenHelper(tokens);
            setTokenData(parsedToken);

            setSpinnerLoading(false);
            setMessageData({type: 'success', detail: 'Data has loaded!'});
        } catch (e) {
            setSpinnerLoading(false);
            setMessageData({type: 'error', detail: 'Something went wrong!'});
        }
    };

    // update will be triggerred from parent component and update the data
    useEffect(() => {
        fetchTokens();
    }, [update]);

    return <Table columns={columns} dataSource={tokenData} />;
};

export default Token;