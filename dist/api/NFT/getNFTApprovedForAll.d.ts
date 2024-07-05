declare const getNFTApprovedForAll: (accessToken: string, network: string, contractAddress: string, ownerAddress: string, operatorAddress: string) => Promise<string | null>;
export default getNFTApprovedForAll;
