interface Token {
    name: string;
    symbol: string;
    platform: string;
    decimals: number;
    logo?: string;
    isNative: boolean;
    type: string;
    totalSupply: number;
    website?: string;
    description?: string;
    balance: number;
    possibleSpam: boolean;
    network: string;
    walletAddress: string;
    updated: string;
    hrBalance: number;
    price?: {
        coingecko?: {
            ETH?: number;
            USD?: number;
            KRW?: number;
            JPY?: number;
        };
        chainlink?: {
            USD?: number;
            KRW?: number;
            JPY?: number;
        };
    };
    marketChart?: {
        coingecko?: Array<[number, number]>;
    };
    contractAddress?: string;
}
declare const getTokens: (accessToken: string, network: string, walletAddress: string, minimalInfo?: boolean) => Promise<Token[] | null>;
export default getTokens;
