declare const sendRawTransaction: (accessToken: string, network: string, sender: string, receiver: string, amount: string, expirationTimestampSecs: number, sequenceNumber: number, maxGasAmount: number, gasUnitPrice: number, pubkey: string, signatureJson: string) => Promise<string | null>;
export default sendRawTransaction;
