declare const getWalletBalance: (accessToken: string, network: string, address: string) => Promise<string | null>;
export default getWalletBalance;
