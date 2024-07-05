declare const getTransactions: (accessToken: string, network: string, address: string) => Promise<string | null>;
export default getTransactions;
