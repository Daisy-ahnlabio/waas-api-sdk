declare const ethCall: (accessToken: string, network: string, isEIP1559: boolean, toAddress: string, data: string, fromAddress?: string, gasLimit?: string, gasPrice?: string, value?: string, nonce?: string, maxPriorityFeePerGas?: string, maxFeePerGas?: string) => Promise<string | null>;
export default ethCall;
