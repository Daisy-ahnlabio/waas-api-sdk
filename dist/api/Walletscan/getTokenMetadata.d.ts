interface TokenInfo {
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
    contractAddress: string;
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
}
declare const getTokenMetadata: (accessToken: string, network: string, contractAddress: string, minimalInfo?: boolean) => Promise<TokenInfo[] | null>;
export default getTokenMetadata;
