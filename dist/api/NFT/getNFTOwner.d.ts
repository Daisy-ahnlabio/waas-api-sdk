declare const getNFTOwner: (accessToken: string, network: string, contractAddress: string, tokenId: number) => Promise<string | null>;
export default getNFTOwner;
