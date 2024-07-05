declare const ethCallEIP1559: (accessToken: string, network: string, toAddress: string, data: string, fromAddress?: string, gasLimit?: string, value?: string, nonce?: string, maxPriorityFeePerGas?: string, maxFeePerGas?: string) => Promise<string | null>;
export default ethCallEIP1559;
