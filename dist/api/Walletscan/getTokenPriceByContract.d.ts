interface TokenPrice {
    [key: string]: {
        [currency: string]: number;
    };
}
declare const getTokenPriceByContract: (accessToken: string, network: string, contractAddress: string, currency: string) => Promise<TokenPrice | null>;
export default getTokenPriceByContract;
