declare const getAptosTransaction: (accessToken: string, network: string, txHash: string) => Promise<string | null>;
export default getAptosTransaction;
