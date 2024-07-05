declare const getTokenAllowance: (accessToken: string, network: string, contractAddress: string, ownerAddress: string, spenderAddress: string) => Promise<string | null>;
export default getTokenAllowance;
