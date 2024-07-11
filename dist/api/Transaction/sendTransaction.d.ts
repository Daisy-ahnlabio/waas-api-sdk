declare const sendTransaction: (accessToken: string, network: string, serializedTx: string) => Promise<string | null>;
export default sendTransaction;
