declare const getNFTApprovalForAllData: (accessToken: string, network: string, operatorAddress: string, approved: boolean) => Promise<string | null>;
export default getNFTApprovalForAllData;
