declare const getTokenInfo: (accessToken: string, network: string, contractAddress: string, ownerAddress?: string) => Promise<any | null>;
export default getTokenInfo;
