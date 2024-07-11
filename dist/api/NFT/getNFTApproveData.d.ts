declare const getNFTApproveData: (accessToken: string, network: string, tokenId: number, approvedAddress: string) => Promise<string | null>;
export default getNFTApproveData;
