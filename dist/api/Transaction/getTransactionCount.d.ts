declare const getTransactionCount: (accessToken: string, network: string, address: string, block: number) => Promise<string | null>;
export default getTransactionCount;
