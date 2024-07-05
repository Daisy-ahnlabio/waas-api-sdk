declare const getBlock: (accessToken: string, network: string, blockNumber: number) => Promise<string | null>;
export default getBlock;
