declare const generateTokenApproveData: (accessToken: string, network: string, spenderAddress: string, value: string) => Promise<string | null>;
export default generateTokenApproveData;
