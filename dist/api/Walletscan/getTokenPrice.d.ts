interface TokenPrice {
    [key: string]: {
        [key: string]: {
            [currency: string]: number;
        };
    };
}
declare const getTokenPrice: (accessToken: string, network: string, currency: string) => Promise<TokenPrice | null>;
export default getTokenPrice;
