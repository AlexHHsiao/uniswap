const BASE_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';
// function to fetch all tokens
export const getTokens = () => {
    const query = `
        {
            tokens(orderBy: totalValueLockedUSD, orderDirection: desc) {
                id
                symbol
                name
                totalValueLockedUSD
                tokenDayData(first: 3, orderBy: date, orderDirection: desc) {
                    priceUSD
                    volumeUSD
                    date
                }
            }
        }
    `;

    return fetch(`${BASE_URL}`, {
        method: 'POST',
        body: JSON.stringify({query})
    });
};

// function to fetch all Pools
export const getPools = () => {
    const query = `
        {
            pools(orderBy: totalValueLockedUSD, orderDirection: desc) {
                id
                totalValueLockedUSD
                poolDayData(first:1, orderBy:date, orderDirection: desc) {
                    volumeUSD
                }
                token0 {
                    id
                    symbol
                    name
                }
                token1 {
                    id
                    symbol
                    name
                }
            }
        }
    `;

    return fetch(`${BASE_URL}`, {
        method: 'POST',
        body: JSON.stringify({query})
    });
};

// function to fetch all transactions
export const getTransactions = () => {
    const query = `
        {
            transactions(orderBy: timestamp, orderDirection: desc) {
                id
                timestamp
                burns(first:1, orderBy:timestamp, orderDirection: desc) {
                    origin
                    amountUSD
                    amount0
                    amount1
                    token0 {
                        id
                        symbol
                        name
                    }
                    token1 {
                        id
                        symbol
                        name
                    }
                }
                swaps(first:1, orderBy:timestamp, orderDirection: desc) {
                    recipient
                    amountUSD
                    amount0
                    amount1
                    token0 {
                        id
                        symbol
                        name
                    }
                    token1 {
                        id
                        symbol
                        name
                    }
                }
                mints(first:1, orderBy:timestamp, orderDirection: desc) {
                    origin
                    amountUSD
                    amount0
                    amount1
                    token0 {
                        id
                        symbol
                        name
                    }
                    token1 {
                        id
                        symbol
                        name
                    }
                }
            }
        }
    `;

    return fetch(`${BASE_URL}`, {
        method: 'POST',
        body: JSON.stringify({query})
    });
};