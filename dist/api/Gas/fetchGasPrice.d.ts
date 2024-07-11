declare const fetchGasPrice: (accessToken: string, network: string) => Promise<{
    gasPrice: string;
    gasLimit: string;
} | null>;
export default fetchGasPrice;
