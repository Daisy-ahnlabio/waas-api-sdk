declare const getTransactionByHash: (accessToken: string, network: string, hash: string) => Promise<string | null>;
export default getTransactionByHash;
