declare const getSequenceNumber: (accessToken: string, network: string, address: string) => Promise<string | null>;
export default getSequenceNumber;
