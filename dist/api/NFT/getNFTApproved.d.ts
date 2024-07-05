declare const getNFTApproved: (accessToken: string, network: string, contractAddress: string, tokenId: number, walletAddress: string) => Promise<string | null>;
export default getNFTApproved;
