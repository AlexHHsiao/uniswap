import React, {useState} from 'react';
import {Tabs, Button} from "antd";
import {TransactionOutlined, MoneyCollectOutlined, PayCircleOutlined} from '@ant-design/icons';
import Token from "../components/token";
import Pool from "../components/pool";
import Transaction from "../components/transaction";

const IconStyle = {
    fontSize: '20px'
}

const Dashboard = () => {
    const [poolUpdate, setPoolUpdate] = useState(false);
    const [tokenUpdate, setTokenUpdate] = useState(false);
    const [transactionUpdate, setTransactionUpdate] = useState(false);
    const [selectedTab, setSelectedTab] = useState('pools');

    // handle tab onChange event
    const reloadHandler = () => {
        if (selectedTab === 'pools') {
            setPoolUpdate((prev) => !prev);
        } else if (selectedTab === 'tokens') {
            setTokenUpdate((prev) => !prev);
        } else {
            setTransactionUpdate((prev) => !prev);
        }
    };

    const tabChangeHandler = (key) => {
        setSelectedTab(key);
    };

    return (
        <>
            <Tabs
                activeKey={selectedTab}
                onChange={tabChangeHandler}
                size='large'
                tabBarExtraContent={<Button type="primary" onClick={reloadHandler}>Reload Data</Button>}
                items={[
                    {
                        label: (
                            <span>
                                <MoneyCollectOutlined style={IconStyle}/>
                                Pools
                            </span>
                        ),
                        key: 'pools',
                        children: <Pool update={poolUpdate}/>,
                    },
                    {
                        label: (
                            <span>
                                <PayCircleOutlined style={IconStyle}/>
                                Tokens
                            </span>
                        ),
                        key: 'tokens',
                        children: <Token update={tokenUpdate}/>,
                    },
                    {
                        label: (
                            <span>
                                <TransactionOutlined style={IconStyle}/>
                                Transactions
                            </span>
                        ),
                        key: 'transactions',
                        children: <Transaction update={transactionUpdate}/>,
                    }
                ]}
            />
        </>
    );
}

export default Dashboard;