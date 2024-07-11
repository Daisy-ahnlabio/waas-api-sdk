declare const generateTokenTransferData: (accessToken: string, network: string, from: string, to: string, value: string) => Promise<string | null>;
export default generateTokenTransferData;
