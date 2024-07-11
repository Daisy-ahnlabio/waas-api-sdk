declare const getNFTBalance: (accessToken: string, network: string, contractAddress: string, walletAddress: string) => Promise<string | null>;
export default getNFTBalance;
