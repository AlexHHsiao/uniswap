import {ETHERSCAN_URL} from "../constants";

// helper method to parse token data into table format
export const parseTokenHelper = (tokens) =>
    tokens.map(({id, name, symbol, totalValueLockedUSD, tokenDayData}) => {
        let price = '0';
        let priceChange = 0;

        if (tokenDayData.length > 0) {
            const {priceUSD} = tokenDayData[0];
            price = priceUSD;
        }

        if (tokenDayData.length > 1 && tokenDayData[tokenDayData.length - 1].priceUSD !== '0') {
            const {priceUSD} = tokenDayData[tokenDayData.length - 1];
            priceChange = (price - priceUSD) / priceUSD * 100;
        }

        return {
            key: id,
            priceChange,
            price: parseInt(price),
            TVL: parseInt(totalValueLockedUSD),
            name: {name, symbol}
        }
    });

// helper method to parse pool data into table format
export const parsePoolHelper = (pools) =>
    pools.map(({
                   id,
                   totalValueLockedUSD,
                   token0: {symbol: symbol1},
                   token1: {symbol: symbol2},
                   poolDayData: [{volumeUSD}]
               }) => ({
        key: id,
        volumeUSD: parseInt(volumeUSD),
        TVL: parseInt(totalValueLockedUSD),
        pool: `${symbol1}/${symbol2}`
    }));

// helper method to parse transaction data into table format
export const parseTransactionHelper = (transactions) =>
    transactions.map(({id, timestamp, burns, swaps, mints}) => {
        let action;
        let tokenAmount0;
        let tokenAmount1;
        let totalValue;
        let account;

        if (burns.length > 0) {
            const [{origin, amountUSD, amount0, amount1, token0: {symbol: symbol0}, token1: {symbol: symbol1}}] = burns;
            action = {id, name: `Remove ${symbol1} and ${symbol0}`};
            tokenAmount0 = {symbol: symbol0, value: Math.abs(parseInt(amount0))};
            tokenAmount1 = {symbol: symbol1, value: Math.abs(parseInt(amount1))};
            account = origin;
            totalValue = parseInt(amountUSD);
        } else if (swaps.length > 0) {
            const [{
                recipient,
                amountUSD,
                amount0,
                amount1,
                token0: {symbol: symbol0},
                token1: {symbol: symbol1}
            }] = swaps;
            action = {id, name: `Swap ${symbol1} for ${symbol0}`};
            tokenAmount0 = {symbol: symbol0, value: Math.abs(parseInt(amount0))};
            tokenAmount1 = {symbol: symbol1, value: Math.abs(parseInt(amount1))};
            account = recipient;
            totalValue = parseInt(amountUSD);
        } else {
            const [{origin, amountUSD, amount0, amount1, token0: {symbol: symbol0}, token1: {symbol: symbol1}}] = mints;
            action = {id, name: `Add ${symbol1} and ${symbol0}`};
            tokenAmount0 = {symbol: symbol0, value: Math.abs(parseInt(amount0))};
            tokenAmount1 = {symbol: symbol1, value: Math.abs(parseInt(amount1))};
            account = origin;
            totalValue = parseInt(amountUSD);
        }

        return {
            key: id,
            action,
            timestamp,
            tokenAmount0,
            tokenAmount1,
            account,
            totalValue
        }
    });

export const etherscanUserLocation = (id) => `${ETHERSCAN_URL}address/${id}`;

export const etherscanTxLocation = (id) => `${ETHERSCAN_URL}tx/${id}`;

// helper method format time difference from now
export const timeCal = (timestamp) => {
    const date = new Date(timestamp * 86400);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();

    // if the time difference is less than 1 minute
    if (diffInMs < 60 * 1000) {
        return 'Recently';
    }
    // if the time difference is less than 1 hour
    else if (diffInMs < 60 * 60 * 1000) {
        const diffInMin = Math.round(diffInMs / (1000 * 60));
        return `${diffInMin} mins ago`;
    }
    // if the time difference is less than 1 day
    else if (diffInMs < 24 * 60 * 60 * 1000) {
        const diffInHrs = Math.round(diffInMs / (1000 * 60 * 60));
        return `${diffInHrs} hours ago`;
    }
    // if the time difference is more than 1 day
    else {
        const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
        return `${diffInDays} days ago`;
    }
};

// helper method to format big number with unit
export const numUnitHelper = (number) => {
    let num;

    if (number >= 1000000000) {
        num = `${(number / 1000000000).toFixed(2)}b`;
    } else if (number >= 1000000) {
        num = `${(number / 1000000).toFixed(2)}m`;
    } else if (number >= 1000) {
        num = `${(number / 1000).toFixed(2)}k`;
    } else {
        num = number.toFixed(2);
    }

    return num;
};